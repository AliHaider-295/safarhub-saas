"use client";

import { useEffect, useState } from "react";
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

// ✅ Move type here
type DashboardStats = {
  revenue: number;
  profit: number;
  passengers: number;
  buses: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("safarhub_token");
    if (!token) router.replace("/login");
  }, [router]);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <main className="h-screen overflow-hidden px-4 py-4 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <DashboardCard
          title="Revenue"
          value={stats ? `$${stats.revenue}` : "Loading..."}
          icon={<DollarSign />}
          type="revenue"
        />
        <DashboardCard
          title="Profit"
          value={stats ? `$${stats.profit}` : "Loading..."}
          icon={<TrendingUp />}
          type="profit"
        />
        <DashboardCard
          title="Passengers"
          value={stats ? stats.passengers : "Loading..."}
          icon={<Users />}
          type="passengers"
        />
        <DashboardCard
          title="Buses"
          value={stats ? stats.buses : "Loading..."}
          icon={<Bus />}
          type="buses"
        />
      </div>

      <div className="flex gap-4 h-[55%]">
        <div className="w-[40%]">
          <RevenueChart />
        </div>

        <div className="w-[60%]">
          <RecentTrips />
        </div>
      </div>
    </main>
  );
}