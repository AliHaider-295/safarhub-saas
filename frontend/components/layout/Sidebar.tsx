"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/utils/auth";
import {
  LayoutDashboard,
  Bus,
  Users,
  Map,
  Wallet,
  UserCog,
  Ticket,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  FileText
} from "lucide-react";
import { useState } from "react";
import {  } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Buses", href: "/dashboard/buses", icon: Bus },
    { name: "Routes", href: "/dashboard/routes", icon: Map },
    { name: "Staff", href: "/dashboard/staff", icon: UserCog },
    { name: "Records", href: "/dashboard/records", icon: FileText },
    { name: "Bookings", href: "/dashboard/bookings", icon: Ticket },
    { name: "Finance", href: "/dashboard/finance", icon: Wallet },
    { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div
      className={`${
        expanded ? "w-64" : "w-20"
      } bg-blue-900 text-white h-screen p-5 flex flex-col transition-all duration-300`}
    >
      {/* Logo + Toggle */}
      <div className="flex items-center justify-between mb-10">
        <h1
          className={`text-2xl font-bold transition-all ${
            !expanded && "hidden"
          }`}
        >
          SafarHub
        </h1>

        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1 rounded bg-blue-800"
        >
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition 
              ${
                isActive
                  ? "bg-white text-blue-900 font-semibold"
                  : "hover:bg-blue-800"
              }`}
            >
              <item.icon size={18} />
              {expanded && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom user section */}
      <div className="mt-auto pt-6 border-t border-blue-700">
  {expanded && (
    <>
      <p className="text-sm">Ali Haider</p>
      <p className="text-xs text-gray-300 mb-3">Admin</p>
    </>
  )}

  {/* 🔴 Logout Button */}
  <button
    onClick={logout}
    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-600 transition w-full"
  >
    <span>🚪</span>
    {expanded && <span>Logout</span>}
  </button>
</div>
    </div>
  );
}