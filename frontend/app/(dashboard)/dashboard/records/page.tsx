"use client";

import { useState } from "react";
import AddTransactionModal from "@/components/records/AddTransactionModal";
import TransactionCards from "@/components/records/TransactionCards";
import { Button } from "@/components/ui/Button";
import { useSummary } from "@/hooks/useSummary";

export default function RecordsPage() {
  const [open, setOpen] = useState(false);

  const { summary, refetch } = useSummary();

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Transaction Records</h1>

        <Button onClick={() => setOpen(true)}>
          + Add Transaction
        </Button>
      </div>

      {/* Cards */}
      <TransactionCards
        income={summary.totalIncome}
        expense={summary.totalExpense}
        profit={summary.totalProfit}
      />

      {/* Modal */}
      <AddTransactionModal
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