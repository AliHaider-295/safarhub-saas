"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardCard from "@/components/dashboard/DashboardCard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentTrips from "@/components/dashboard/RecentTrips";
import {
  DollarSign,
  TrendingUp,
  Users,
  Bus,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("safarhub_token");
    if (!token) router.replace("/login");
  }, [router]);

  return (
    <main className="h-screen overflow-hidden px-4 py-4 space-y-4">

      {/* 🔹 Heading (paragraph removed) */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h1>
      </div>

      {/* 🔹 Top Cards (less margin, compact) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <DashboardCard
  title="Revenue"
  value="$1,200"
  icon={<DollarSign />}
  type="revenue"
/>

<DashboardCard
  title="Profit"
  value="$400"
  icon={<TrendingUp />}
  type="profit"
/>

<DashboardCard
  title="Passengers"
  value="320"
  icon={<Users />}
  type="passengers"
/>

<DashboardCard
  title="Buses"
  value="25"
  icon={<Bus />}
  type="buses"
/>
      </div>

      {/* 🔹 Bottom Section (Chart + Table in one row) */}
      <div className="flex gap-4 h-[55%]">

        {/* 📊 Chart (40% width, smaller height) */}
        <div className="w-[40%]">
          <RevenueChart />
        </div>

        {/* 📋 Recent Trips (60% width) */}
        <div className="w-[60%]">
          <RecentTrips />
        </div>

      </div>

    </main>
  );
}