export type NavUser = {
  name: string;
  email: string;
  image?: string | null;
};

export type NavLink = {
  href: string;
  label: string;
};

export const publicLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];

export const privateLinks: NavLink[] = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];
