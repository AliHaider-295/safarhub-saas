"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  const { summary, loading } = useSummary();

  useEffect(() => {
    const token = localStorage.getItem("safarhub_token");
    if (!token) router.replace("/login");
  }, [router]);

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

        {/* STILL STATIC (for now) */}
        <DashboardCard
          title="Passengers"
          value={0}
          icon={<Users />}
          type="passengers"
        />

        <DashboardCard
          title="Buses"
          value={0}
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