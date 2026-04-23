"use client";

import { Bell } from "lucide-react";

export default function Topbar() {
  return (
    <div className="h-16 bg-white shadow flex items-center justify-between px-6">

      {/* Company Name */}
      <h2 className="text-xl font-semibold">
        Safar Transport
      </h2>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <Bell size={20} />

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full" />
          <span className="text-sm">Ali</span>
        </div>
      </div>
    </div>
  );
}