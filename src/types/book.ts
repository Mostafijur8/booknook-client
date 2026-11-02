export type BookCategory =
  | "Fiction"
  | "Science"
  | "History"
  | "Kids"
  | "Others";

export interface Book {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  image: string;
  description: string;
  addedBy: {
    name: string;
    email: string;
  };
  totalCopies: number;
  createdAt: string;
  updatedAt?: string;
}
