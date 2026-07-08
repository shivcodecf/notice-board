export interface Notice {
  id: string;
  title: string;
  body: string;
  category: "EXAM" | "EVENT" | "GENERAL";
  priority: "NORMAL" | "URGENT";
  publishDate: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}