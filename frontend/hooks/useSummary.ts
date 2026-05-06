import { useEffect, useState } from "react";
import { authFetch } from "@/lib/api";

export const useSummary = () => {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalProfit: 0,
    totalPassengers: 0, // ✅ NEW
  });

  const [loading, setLoading] = useState(true);

  const fetchSummary = async () => {
    try {
      const res = await authFetch("/trips/summary");
  
      const data = await res.json(); // ✅ IMPORTANT FIX
  
      console.log("SUMMARY RESPONSE:", data);
  
      setSummary({
        totalIncome: data.totalIncome || 0,
        totalExpense: data.totalExpense || 0,
        totalProfit: data.totalProfit || 0,
        totalPassengers: data.totalPassengers || 0,
      });
    } catch (err) {
      console.error("Summary error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return { summary, loading, refetch: fetchSummary };
};