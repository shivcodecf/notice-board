import { Notice } from "@/types/notice";
import Link from "next/link";
import {
  CalendarDaysIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

interface Props {
  notice: Notice;
}

export default function NoticeCard({ notice }: Props) {
  return (
    <div
      className="
      bg-white
      rounded-xl
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      overflow-hidden
      "
    >
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">{notice.title}</h2>

          {notice.priority === "URGENT" ? (
            <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Urgent
            </span>
          ) : (
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
              Normal
            </span>
          )}
        </div>

        <p className="text-gray-600 mt-4">{notice.body}</p>

        <div className="flex justify-between mt-6 text-sm text-gray-500">
          <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
            {notice.category}
          </span>

          <div className="flex items-center gap-1">
            <CalendarDaysIcon className="h-4 w-4" />

            {new Date(notice.publishDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div
        className="
        border-t
        flex
        "
      >
        <Link
          href={`/notice/edit/${notice.id}`}
          className="flex-1 py-3 hover:bg-gray-100 flex justify-center items-center gap-2"
        >
          <PencilSquareIcon className="h-5 w-5" />
          Edit
        </Link>

        <button
          className="
          flex-1
          py-3
          hover:bg-red-50
          text-red-500
          flex
          justify-center
          items-center
          gap-2
          "
        >
          <TrashIcon className="h-5 w-5" />
          Delete
        </button>
      </div>
    </div>
  );
}
