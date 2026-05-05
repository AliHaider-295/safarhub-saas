"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/api";


import DashboardCard from "@/components/dashboard/DashboardCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentTrips from "@/components/dashboard/RecentTrips";
import AddBusModal from "@/components/dashboard/AddBusModal";

import { useSummary } from "@/hooks/useSummary";

import {
  DollarSign,
  TrendingUp,
  Users,
  Bus,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  const [openBusModal, setOpenBusModal] = useState(false);

  // ✅ NEW STATE (for buses + passengers)
  const [stats, setStats] = useState({
    buses: 0,
    passengers: 0,
  });

  const { summary, loading } = useSummary();

  // ✅ AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("safarhub_token");
    if (!token) router.replace("/login");
  }, [router]);

  // ✅ FETCH DASHBOARD STATS (IMPORTANT FIX)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await authFetch("/dashboard/stats");
  
        if (!res.ok) {
          throw new Error("Failed to fetch stats");
        }
  
        const data = await res.json();
  
        setStats({
          buses: data?.buses ?? 0,
          passengers: data?.passengers ?? 0,
        });
  
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };
  
    fetchStats();
  }, []);
  return (
    <main className="h-screen overflow-hidden px-4 py-4 space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h1>

        <button
          onClick={() => setOpenBusModal(true)}
          className="px-4 py-2 bg-black text-white rounded-lg"
        >
          + Add Bus
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

        <DashboardCard
          title="Revenue"
          value={
            loading ? "Loading..." : `₨${summary?.totalIncome ?? 0}`
          }
          icon={<DollarSign />}
          type="revenue"
        />

        <DashboardCard
          title="Profit"
          value={
            loading ? "Loading..." : `₨${summary?.totalProfit ?? 0}`
          }
          icon={<TrendingUp />}
          type="profit"
        />

        {/* ✅ NOW DYNAMIC */}
        <DashboardCard
          title="Passengers"
          value={stats.passengers}
          icon={<Users />}
          type="passengers"
        />

        <DashboardCard
          title="Buses"
          value={stats.buses}
          icon={<Bus />}
          type="buses"
        />

      </div>

      {/* CHART + TRIPS */}
      <div className="flex gap-4 h-[55%]">

        <div className="w-[40%]">
          <RevenueChart
            income={summary?.totalIncome ?? 0}
            expense={summary?.totalExpense ?? 0}
          />
        </div>

        <div className="w-[60%]">
          <RecentTrips />
        </div>

      </div>

      {/* MODAL */}
      <AddBusModal
        open={openBusModal}
        onClose={() => setOpenBusModal(false)}
        onSuccess={() => setOpenBusModal(false)}
      />

    </main>
  );
}