"use client";

import { useState } from "react";
import StaffCards from "@/components/staff/StaffCards";
import StaffTable from "@/components/staff/StaffTable";
import StaffStatusChart from "@/components/staff/StaffStatusChart";
import StaffTrendChart from "@/components/staff/StaffTrendChart";
import AddStaffModal from "@/components/staff/AddStaffModal";

export default function StaffPage() {
  const [openModal, setOpenModal] = useState(false);

  const [refreshKey, setRefreshKey] = useState(0);

  const fetchStaff = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 w-full min-w-0"> {/* ✅ IMPORTANT */}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Staff Management</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
        >
          + Add Staff
        </button>
      </div>

      {/* Cards */}
      <StaffCards refreshKey={refreshKey} /> {/* ✅ FIXED */}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full min-w-0">
        
        {/* ✅ Wrap each chart */}
        <div className="w-full min-w-0">
          <StaffStatusChart refreshKey={refreshKey} />
        </div>

        <div className="w-full min-w-0">
          <StaffTrendChart refreshKey={refreshKey} />
        </div>

      </div>

      {/* Table */}
      <StaffTable refreshKey={refreshKey} /> {/* ✅ FIXED */}

      {/* Modal */}
      <AddStaffModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchStaff}
      />
    </div>
  );
}