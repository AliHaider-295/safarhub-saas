"use client";

import { useEffect, useState } from "react";
import {
  User,
  Users,
  ShieldCheck,
  Wrench,
  UserCheck,
} from "lucide-react";

import { getToken } from "@/utils/auth"; // ✅ FIX

type Staff = {
  id: string;
  role: string;
  status: string;
};

type Props = {
  refreshKey?: number; // ✅ allow refresh
};

export default function StaffCards({ refreshKey }: Props) {
  const [staff, setStaff] = useState<Staff[]>([]);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = getToken();
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/staff", {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ FIXED
          },
        });

        const data = await res.json();
        setStaff(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Fetch staff error:", err);
      }
    };

    fetchStaff();
  }, [refreshKey]); // ✅ refresh works now

  const getStats = (role: string) => {
    const filtered = staff.filter((s) => s.role === role);
    const active = filtered.filter((s) => s.status === "ACTIVE").length;

    return {
      value: filtered.length,
      active,
      inactive: filtered.length - active,
    };
  };

  const cards = [
    {
      title: "Drivers",
      role: "Driver",
      icon: User,
      color: "bg-blue-100 text-blue-600",
      progress: "bg-blue-500",
    },
    {
      title: "Conductors",
      role: "Conductor",
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
      progress: "bg-green-500",
    },
    {
      title: "Support Staff",
      role: "Support",
      icon: Wrench,
      color: "bg-purple-100 text-purple-600",
      progress: "bg-purple-500",
    },
    {
      title: "Helpers",
      role: "Helper",
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      progress: "bg-orange-500",
    },
    {
      title: "Security",
      role: "Security",
      icon: ShieldCheck,
      color: "bg-teal-100 text-teal-600",
      progress: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 w-full min-w-0">
      {cards.map((card) => {
        const Icon = card.icon;
        const stats = getStats(card.role);

        const percentage =
          stats.value === 0 ? 0 : (stats.active / stats.value) * 100;

        return (
          <div
            key={card.role} // ✅ FIXED (stable key)
            className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{card.title}</p>
                <h2 className="text-lg font-semibold text-gray-800">
                  {stats.value}
                </h2>
              </div>

              <div className={`p-2 rounded-md ${card.color}`}>
                <Icon size={16} />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-2 flex justify-between text-[11px] text-gray-500">
              <span>
                Active:{" "}
                <span className="text-green-600 font-medium">
                  {stats.active}
                </span>
              </span>

              <span>
                Inactive:{" "}
                <span className="text-red-500 font-medium">
                  {stats.inactive}
                </span>
              </span>
            </div>

            {/* Progress */}
            <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${card.progress}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}