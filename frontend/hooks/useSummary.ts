import { useEffect, useState } from "react";


    export const useSummary = () => {
        const [summary, setSummary] = useState({
          totalIncome: 0,
          totalExpense: 0,
          totalProfit: 0,
        });
      
        const [loading, setLoading] = useState(true);
      
        const fetchSummary = async () => {
          try {
            const token = localStorage.getItem("safarhub_token");
      
            console.log("TOKEN USED:", token); // 🔥 DEBUG
      
            const res = await fetch(
              "http://localhost:5000/api/trips/summary",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
      
            const data = await res.json();
      
            console.log("SUMMARY RESPONSE:", data);
      
            setSummary({
              totalIncome: data.totalIncome || 0,
              totalExpense: data.totalExpense || 0,
              totalProfit: data.totalProfit || 0,
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