// Type representing each book logged
import { Timestamp } from "firebase/firestore";

export type Book = {
  id: string;          // firestore document ID
  title: string;
  author: string;
  year: number;
  pages: number;
  genre: string; 
  rating: number;      // 1–5
  review: string | null;
  addedAt: Timestamp;
};
