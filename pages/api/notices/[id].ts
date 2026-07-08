import type { NextApiRequest, NextApiResponse } from "next";
import { getNoticeById } from "@/services/notice.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({
      message: "Invalid Notice ID",
    });
  }

  switch (req.method) {
    case "GET":
      try {
        const notice = await getNoticeById(id);

        if (!notice) {
          return res.status(404).json({
            message: "Notice not found",
          });
        }

        return res.status(200).json(notice);
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