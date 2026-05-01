import RecordsCards from "@/components/records/RecordsCards";

export default function RecordsPage() {
  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Records</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add Record
        </button>
      </div>

      {/* Cards */}
      <RecordsCards income={0} expense={0} />

    </div>
  );
}