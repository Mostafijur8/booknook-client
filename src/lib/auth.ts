import "server-only";

import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  throw new Error("MONGODB_URI is not configured.");
}

const authSecret = process.env.BETTER_AUTH_SECRET;
if (!authSecret || authSecret.length < 32) {
  throw new Error("BETTER_AUTH_SECRET must be set and contain at least 32 characters.");
}

const baseURL =
  process.env.VERCEL
    ? "https://booknook-tawny.vercel.app"
    : process.env.BETTER_AUTH_URL || "http://localhost:3000";
const trustedOrigins = [
  baseURL,
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined,
  ...(process.env.BETTER_AUTH_TRUSTED_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
].filter((origin): origin is string => Boolean(origin));
const mongoDatabase = process.env.MONGODB_DATABASE;

const globalForMongo = globalThis as typeof globalThis & {
  bookNookMongoClient?: MongoClient;
};

const mongoClient =
  globalForMongo.bookNookMongoClient ?? new MongoClient(mongoUri);
globalForMongo.bookNookMongoClient = mongoClient;

const database = mongoDatabase
  ? mongoClient.db(mongoDatabase)
  : mongoClient.db();

const googleProvider =
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
      }
    : undefined;

export const auth = betterAuth({
  appName: "BookNook",
  baseURL,
  secret: authSecret,
  trustedOrigins: [...new Set(trustedOrigins)],
  account: {
    accountLinking: {
      enabled: true,
      // Email/password users are not email-verified in this assignment.
      // Google must still return a verified matching email for automatic linking.
      requireLocalEmailVerified: false,
      disableImplicitLinking: false,
    },
  },
  database: mongodbAdapter(database, {
    client: mongoClient,
    // The local example MongoDB server is standalone and does not support transactions.
    transaction: false,
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    minPasswordLength: 6,
    maxPasswordLength: 128,
  },
  hooks: {
    before: createAuthMiddleware(async (context) => {
      if (context.path !== "/sign-up/email") return;

      const password = context.body?.password;
      if (
        typeof password !== "string" ||
        password.length < 6 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password)
      ) {
        throw new APIError("BAD_REQUEST", {
          message:
            "Password must be at least 6 characters and include uppercase and lowercase letters.",
        });
      }
    }),
  },
  socialProviders: googleProvider,
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60,
    },
  },
  // Keep nextCookies last so Next.js can persist auth response cookies.
  plugins: [
    jwt({
      sessionCookieCache: true,
      jwt: {
        expirationTime: "5m",
        definePayload: ({ user }) => ({ email: user.email }),
      },
    }),
    nextCookies(),
  ],
});
