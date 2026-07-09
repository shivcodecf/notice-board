import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { NoticeFormData, noticeSchema } from "@/lib/noticeSchema";
import toast from "react-hot-toast";

interface NoticeFormProps {
  initialData?: NoticeFormData;
  isEdit?: boolean;
  noticeId?: string;
}

export default function NoticeForm({
  initialData,
  isEdit = false,
  noticeId,
}: NoticeFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoticeFormData>({
    resolver: zodResolver(noticeSchema),
    defaultValues: initialData || {
      title: "",
      body: "",
      category: "GENERAL",
      priority: "NORMAL",
      publishDate: "",
    },
  });

  const onSubmit = async (data: NoticeFormData) => {
  try {
    if (isEdit) {
      await axios.put(`/api/notices/${noticeId}`, data);
      toast.success("Notice updated successfully");
    } else {
      await axios.post("/api/notices", data);
      toast.success("Notice created successfully");
    }

    await router.push("/");
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">
        {isEdit ? "Edit Notice" : "Add Notice"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">Title</label>

          <input
            {...register("title")}
            type="text"
            placeholder="Enter notice title"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Body */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">Body</label>

          <textarea
            {...register("body")}
            rows={5}
            placeholder="Enter notice description"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

          {errors.body && (
            <p className="text-red-500 text-sm mt-1">{errors.body.message}</p>
          )}
        </div>

        {/* Category */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Category
          </label>

          <select
            {...register("category")}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="EXAM">Exam</option>
            <option value="EVENT">Event</option>
            <option value="GENERAL">General</option>
          </select>

          {errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Priority */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Priority
          </label>

          <select
            {...register("priority")}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Urgent</option>
          </select>

          {errors.priority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.priority.message}
            </p>
          )}
        </div>

        {/* Publish Date */}

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Publish Date
          </label>

          <input
            type="date"
            {...register("publishDate")}
            className="w-full border rounded-lg px-4 py-3"
          />

          {errors.publishDate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.publishDate.message}
            </p>
          )}
        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.back()}
            className="
    px-5 py-3 rounded-lg border
    hover:bg-gray-100
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-25"
                  />
                  <path
                    d="M22 12a10 10 0 0 1-10 10"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="opacity-75"
                  />
                </svg>
                Saving...
              </div>
            ) : isEdit ? (
              "Update Notice"
            ) : (
              "Save Notice"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
