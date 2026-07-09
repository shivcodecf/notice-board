import axios from "axios";
import { useEffect, useState } from "react";
import NoticeCard from "@/components/NoticeCard";
import { Notice } from "@/types/notice";
import Link from "next/link";
import DeleteModal from "@/components/DeleteModal";
import toast from "react-hot-toast";

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.get("/api/notices");
      setNotices(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
  if (!selectedNotice) return;

  try {
    setDeleteLoading(true);

    await axios.delete(`/api/notices/${selectedNotice.id}`);

    setNotices((prev) =>
      prev.filter(
        (notice) => notice.id !== selectedNotice.id
      )
    );

    toast.success("Notice deleted successfully");

    setIsDeleteOpen(false);
    setSelectedNotice(null);
  } catch (error) {
    console.error(error);
    toast.error("Failed to delete notice");
  } finally {
    setDeleteLoading(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto py-10 px-5">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Notice Board</h1>

            <p className="text-gray-500 mt-2">
              Manage all notices in one place
            </p>
          </div>

          <Link
            href="/notice/add"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            + Add Notice
          </Link>
        </div>

        {notices.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">No Notices Found</h2>

            <p className="text-gray-500 mt-3">Create your first notice.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <NoticeCard
                key={notice.id}
                notice={notice}
                onDelete={(notice) => {
                  setSelectedNotice(notice);
                  setIsDeleteOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <DeleteModal
  open={isDeleteOpen}
  title={selectedNotice?.title || ""}
  loading={deleteLoading}
  onClose={() => {
    setIsDeleteOpen(false);
    setSelectedNotice(null);
  }}
  onDelete={handleDelete}
/>
    </div>
  );
}
