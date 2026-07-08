import { prisma } from "@/lib/prisma";
import { Category, Priority } from "@prisma/client";

interface CreateNoticeInput {
  title: string;
  body: string;
  category: Category;
  priority: Priority;
  publishDate: Date;
  image?: string;
}

export const getAllNotices = async () => {
  return prisma.notice.findMany({
    orderBy: [
      {
        priority: "desc",
      },
      {
        publishDate: "desc",
      },
    ],
  });
};

export const createNotice = async (data: CreateNoticeInput) => {
  return prisma.notice.create({
    data,
  });
};