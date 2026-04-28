"use client";

import { useState } from "react";
import StaffCards from "@/components/staff/StaffCards";
import StaffTable from "@/components/staff/StaffTable";
import StaffStatusChart from "@/components/staff/StaffStatusChart";
import StaffTrendChart from "@/components/staff/StaffTrendChart";
import AddStaffModal from "@/components/staff/AddStaffModal";

export default function StaffPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Staff Management</h1>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Staff
        </button>
      </div>

      {/* Cards */}
      <StaffCards />

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StaffStatusChart />
        <StaffTrendChart />
      </div>

      {/* Table */}
      <StaffTable />

      {/* Modal */}
      <AddStaffModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}