import { Category, Priority } from "@prisma/client";

export const validateNotice = (data: any) => {
  const { title, body, category, priority, publishDate } = data;

  if (!title?.trim())
    return { valid: false, message: "Title is required" };

  if (!body?.trim())
    return { valid: false, message: "Body is required" };

  if (!Object.values(Category).includes(category))
    return { valid: false, message: "Invalid category" };

  if (!Object.values(Priority).includes(priority))
    return { valid: false, message: "Invalid priority" };

  if (isNaN(new Date(publishDate).getTime()))
    return { valid: false, message: "Invalid publish date" };

  return { valid: true };
};