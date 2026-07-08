import type { NextApiRequest, NextApiResponse } from "next";
import {
  deleteNotice,
  getNoticeById,
  updateNotice,
} from "@/services/notice.service";
import { validateNotice } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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

    case "PUT":
      try {
        const validation = validateNotice(req.body);

        if (!validation.valid) {
          return res.status(400).json({
            message: validation.message,
          });
        }

        const updatedNotice = await updateNotice(id, {
          ...req.body,
          publishDate: new Date(req.body.publishDate),
        });

        return res.status(200).json(updatedNotice);
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Internal Server Error",
        });
      }

    case "DELETE":
      try {
        const notice = await getNoticeById(id);

        if (!notice) {
          return res.status(404).json({
            message: "Notice not found",
          });
        }

        await deleteNotice(id);

        return res.status(200).json({
          message: "Notice deleted successfully",
        });
      } catch (error) {
        console.error(error);

        return res.status(500).json({
          message: "Internal Server Error",
        });
      }
  }
}
