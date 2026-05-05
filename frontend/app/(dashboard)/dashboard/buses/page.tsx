"use client";

import { useEffect, useState } from "react";

import BusesCard from "@/components/buses/BusesCard";
import BusesTable from "@/components/buses/BusesTable";
import BusStatusChart from "@/components/buses/BusStatusChart";
import FleetChart from "@/components/buses/FleetChart";
import AddBusModal from "@/components/buses/AddBusModal";

import {
  Bus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
} from "lucide-react";

import { authFetch } from "@/lib/api"; // ✅ ADDED

export default function BusesPage() {
  const [openModal, setOpenModal] = useState(false);
  const [buses, setBuses] = useState<any[]>([]);

  // ✅ Fetch buses (UPDATED ONLY API LAYER)
  const fetchBuses = async () => {
    try {
      const res = await authFetch("/buses"); // 🔥 CLEAN SHORT API

      if (!res.ok) {
        throw new Error("Failed to fetch buses");
      }

      const data = await res.json();

      console.log("Fetched buses:", data);

      setBuses(
        Array.isArray(data)
          ? data
          : data?.buses || data?.data || []
      );

    } catch (err) {
      console.error("Fetch error:", err);
      setBuses([]);
    }
  };

  useEffect(() => {
    fetchBuses();

    const onFocus = () => fetchBuses();
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, []);

  // ✅ Stats calculation (UNCHANGED LOGIC)
  const total = buses.length;
  const active = buses.filter(b => b.status === "ACTIVE").length;
  const maintenance = buses.filter(b => b.status === "MAINTENANCE").length;
  const inactive = buses.filter(b => b.status === "INACTIVE").length;
  const capacity = buses.reduce((sum, b) => sum + b.capacity, 0);

  return (
    <main className="p-4 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Buses</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add New Bus
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <BusesCard title="Total Buses" value={total.toString()} description="All buses" icon={<Bus />} />
        <BusesCard title="Active" value={active.toString()} description="Running" icon={<CheckCircle />} type="active" />
        <BusesCard title="Maintenance" value={maintenance.toString()} description="Under repair" icon={<AlertTriangle />} type="maintenance" />
        <BusesCard title="Inactive" value={inactive.toString()} description="Stopped" icon={<XCircle />} type="inactive" />
        <BusesCard title="Capacity" value={capacity.toString()} description="Seats" icon={<Users />} type="capacity" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="w-full h-[300px] min-w-0">
          <BusStatusChart buses={buses} />
        </div>

        <div className="w-full h-[300px] min-w-0">
          <FleetChart buses={buses} />
        </div>
      </div>

      {/* Table */}
      <BusesTable buses={buses} fetchBuses={fetchBuses} />

      {/* Modal */}
      <AddBusModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        fetchBuses={fetchBuses}
      />

    </main>
  );
}