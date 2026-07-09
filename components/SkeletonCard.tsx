export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-6 w-40 bg-gray-300 rounded"></div>
        <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
      </div>

      <div className="mt-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>

      <div className="flex justify-between mt-6">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      <div className="border-t mt-6 pt-4 flex gap-4">
        <div className="h-10 flex-1 bg-gray-200 rounded-lg"></div>
        <div className="h-10 flex-1 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  );
}