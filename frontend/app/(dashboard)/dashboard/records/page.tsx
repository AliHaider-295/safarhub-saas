"use client";

import { useState } from "react";
import AddRecordModal from "@/components/records/AddRecordModal";
import RecordsCards from "@/components/records/RecordsCards";
import { Button } from "@/components/ui/Button";
import { useSummary } from "@/hooks/useSummary";

export default function RecordsPage() {
  const [open, setOpen] = useState(false);

  const { summary, refetch } = useSummary();

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
      <RecordsCards
        income={summary.totalIncome}
        expense={summary.totalExpense}
        profit={summary.totalProfit}
      />

      {/* Modal */}
      <AddRecordModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          refetch(); // 🔥 refresh data
        }}
      />

    </div>
  );
}