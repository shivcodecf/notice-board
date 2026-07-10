import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NoticeForm from "@/components/NoticeForm";

export default function EditNotice() {
  const router = useRouter();
  const { id } = router.query;

  const [notice, setNotice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchNotice();
    }
  }, [id]);

  const fetchNotice = async () => {
    try {
      const res = await axios.get(`/api/notices/${id}`);
      setNotice(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  if (!notice) {
    return <h1 className="text-center mt-10">Notice not found</h1>;
  }

  return (
    <div className="p-10">
      {/* <h1 className="text-3xl font-bold">Edit Notice</h1> */}

      <NoticeForm
        initialData={{
          title: notice.title,
          body: notice.body,
          category: notice.category,
          priority: notice.priority,
          publishDate: notice.publishDate.split("T")[0],
        }}
        noticeId={notice.id}
        isEdit
      />
    </div>
  );
}
