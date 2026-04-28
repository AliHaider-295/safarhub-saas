"use client";

export default function AddStaffModal({ open, onClose }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="font-semibold mb-4">Add Staff</h2>

        <input placeholder="Name" className="w-full border p-2 mb-2 rounded" />
        <input placeholder="Role" className="w-full border p-2 mb-2 rounded" />
        <input placeholder="Phone" className="w-full border p-2 mb-2 rounded" />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}