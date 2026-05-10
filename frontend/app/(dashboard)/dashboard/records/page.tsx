"use client";

import { useEffect, useState } from "react";

import AddTransactionModal from "@/components/records/AddTransactionModal";
import TransactionCards from "@/components/records/TransactionCards";
import TransactionsTable from "@/components/records/TransactionsTable";
import TransactionFilters from "@/components/records/TransactionFilters";

import { Button } from "@/components/ui/Button";
import { useSummary } from "@/hooks/useSummary";
import { authFetch } from "@/lib/api";

export default function RecordsPage() {
  const [open, setOpen] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    type: "",
    category: "",
    busId: "",
    routeId: "",
  });

  const { summary, refetch } = useSummary();

  // ✅ FETCH TRANSACTIONS
  const fetchTransactions = async () => {
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const query = new URLSearchParams(cleanFilters as any).toString();

      const res = await authFetch(`/transactions?${query}`);
      const data = await res.json();

      setTransactions(data);
    } catch (err) {
      console.error("Transaction fetch error:", err);
    }
  };

  // ✅ FETCH BUSES + ROUTES (MISSING PART FIXED)
  const fetchBusesAndRoutes = async () => {
    try {
      const [busRes, routeRes] = await Promise.all([
        authFetch("/buses"),
        authFetch("/routes"),
      ]);

      const busData = await busRes.json();
      const routeData = await routeRes.json();

      setBuses(busData);
      setRoutes(routeData);
    } catch (err) {
      console.error("Bus/Route fetch error:", err);
    }
  };

  // LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchTransactions();
    fetchBusesAndRoutes();
  }, []);

  // REFETCH WHEN FILTERS CHANGE
  useEffect(() => {
    fetchTransactions();
  }, [filters]);

  const handleExport = () => {
    const query = new URLSearchParams(filters).toString();

    window.open(
      `http://localhost:5000/api/transactions/export?${query}`,
      "_blank"
    );
  };

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

      {/* SUMMARY */}
      <TransactionCards
        income={summary.totalIncome}
        expense={summary.totalExpense}
        profit={summary.totalProfit}
      />

      {/* FILTERS (FIXED: buses + routes added) */}
      <TransactionFilters
        filters={filters}
        setFilters={setFilters}
        onFilter={fetchTransactions}
        onExport={handleExport}
        buses={buses}
        routes={routes}
      />

      {/* TABLE */}
      <TransactionsTable transactions={transactions} />

      {/* MODAL */}
      <AddTransactionModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={() => {
          setOpen(false);
          refetch();
          fetchTransactions();
        }}
      />
    </div>
  );
}