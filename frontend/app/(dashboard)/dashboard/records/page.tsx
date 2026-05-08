"use client";

import { useEffect, useState } from "react";

import AddTransactionModal from "@/components/records/AddTransactionModal";
import TransactionCards from "@/components/records/TransactionCards";
import TransactionsTable from "@/components/records/TransactionsTable";

import { Button } from "@/components/ui/Button";

import { useSummary } from "@/hooks/useSummary";

import { authFetch } from "@/lib/api";

export default function RecordsPage() {

  const [open, setOpen] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const { summary, refetch } = useSummary();

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const res = await authFetch(
        "/transactions"
      );

      if (!res.ok) {
        throw new Error(
          "Failed to fetch transactions"
        );
      }

      const data = await res.json();

      setTransactions(data);

    } catch (err) {

      console.error(err);

    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchTransactions();

  }, []);

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Transaction Records
        </h1>

        <Button onClick={() => setOpen(true)}>
          + Add Transaction
        </Button>

      </div>

      {/* SUMMARY CARDS */}
      <TransactionCards
        income={summary.totalIncome}
        expense={summary.totalExpense}
        profit={summary.totalProfit}
      />

      {/* TRANSACTIONS TABLE */}
      <TransactionsTable
        transactions={transactions}
      />

      {/* ADD TRANSACTION MODAL */}
      <AddTransactionModal
        open={open}

        onClose={() => setOpen(false)}

        onSuccess={() => {

          setOpen(false);

          // refresh cards
          refetch();

          // refresh table
          fetchTransactions();
        }}
      />

    </div>
  );
}