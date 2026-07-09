import { useState } from "react";

interface DeleteModalProps {
  open: boolean;
  title: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({
  open,
  title,
  loading,
  onClose,
  onDelete,
}: DeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-[90%] max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-900">Delete Notice</h2>

        <p className="text-gray-600 mt-4">
          Are you sure you want to delete
          <span className="font-semibold"> "{title}"</span>?
        </p>

        <p className="text-red-500 text-sm mt-2">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={loading}
            className="
    px-5
    py-2
    rounded-lg
    border
    hover:bg-gray-100
    disabled:opacity-50
    disabled:cursor-not-allowed
  "
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            disabled={loading}
            className="
    px-5
    py-2
    rounded-lg
    bg-red-600
    text-white
    hover:bg-red-700
    disabled:bg-red-400
    disabled:cursor-not-allowed
    min-w-[110px]
  "
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
