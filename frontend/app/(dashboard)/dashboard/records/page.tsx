"use client";

import { useState } from "react";
import AddRecordModal from "@/components/records/AddRecordModal";
import RecordsCards from "@/components/records/RecordsCards";
import { Button } from "@/components/ui/Button";

export default function RecordsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Records</h1>

        <Button onClick={() => setOpen(true)}>
          + Add Record
        </Button>
      </div>

      {/* Cards */}
      <RecordsCards income={0} expense={0} />

      {/* Modal */}
      <AddRecordModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          console.log("refresh data here later");
        }}
      />

    </div>
  );
}