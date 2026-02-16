export interface Book {
  id?: string;
  title: string;
  author: string;
  rating: number;
  pages: number;
  dateRead?: string;
  reviewText: string;
  coverURL?: string;
  createdAt: Date;
}
