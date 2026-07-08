import { useState } from "react";

export default function NoticeForm() {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <h1 className="text-3xl font-bold mb-8">
        Add Notice
      </h1>

      <form className="space-y-6">

        {/* Title */}

        <div>

          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
            placeholder="Enter notice title"
          />

        </div>

        {/* Body */}

        <div>

          <label className="block mb-2 font-medium">
            Body
          </label>

          <textarea
            rows={5}
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
            placeholder="Enter notice description"
          />

        </div>

        {/* Category */}

        <div>

          <label className="block mb-2 font-medium">
            Category
          </label>

          <select
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            "
          >
            <option value="EXAM">Exam</option>
            <option value="EVENT">Event</option>
            <option value="GENERAL">General</option>
          </select>

        </div>

        {/* Priority */}

        <div>

          <label className="block mb-2 font-medium">
            Priority
          </label>

          <select
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            "
          >
            <option value="NORMAL">Normal</option>
            <option value="URGENT">Urgent</option>
          </select>

        </div>

        {/* Publish Date */}

        <div>

          <label className="block mb-2 font-medium">
            Publish Date
          </label>

          <input
            type="date"
            className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            "
          />

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">

          <button
            type="button"
            className="
            px-5
            py-3
            rounded-lg
            border
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
            px-5
            py-3
            rounded-lg
            bg-blue-600
            text-white
            hover:bg-blue-700
            "
          >
            Save Notice
          </button>

        </div>

      </form>

    </div>
  );
}