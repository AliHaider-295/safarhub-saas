import { Pencil } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Profile
        </h1>

        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
          <span className="text-blue-600 font-medium">Home</span>
          <span>/</span>
          <span>Profile</span>
        </div>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 transition-all text-white px-5 py-3 rounded-xl flex items-center gap-2 text-sm font-medium shadow-sm">
        <Pencil size={16} />
        Edit Profile
      </button>
    </div>
  );
}