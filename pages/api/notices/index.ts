import type { NextApiRequest, NextApiResponse } from "next";
import { createNotice, getAllNotices } from "@/services/notice.service";
import { validateNotice } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      try {
        const notices = await getAllNotices();
        return res.status(200).json(notices);
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          error: String(error),
        });
      }

    case "POST":
      try {
        const validation = validateNotice(req.body);

        if (!validation.valid) {
          return res.status(400).json({
            message: validation.message,
          });
        }

        const notice = await createNotice({
          ...req.body,
          publishDate: new Date(req.body.publishDate),
        });

        return res.status(201).json(notice);
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

    default:
      return res.status(405).json({
        message: "Method Not Allowed",
      });
  }
}
