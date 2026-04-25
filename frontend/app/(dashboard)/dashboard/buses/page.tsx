"use client";

import { useState } from "react";

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

export default function BusesPage() {

  // ✅ MUST be inside component
  const [openModal, setOpenModal] = useState(false);

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
        <BusesCard title="Total Buses" value="24" description="All buses" icon={<Bus />} />
        <BusesCard title="Active" value="18" description="Running" icon={<CheckCircle />} type="active" />
        <BusesCard title="Maintenance" value="3" description="Under repair" icon={<AlertTriangle />} type="maintenance" />
        <BusesCard title="Inactive" value="3" description="Stopped" icon={<XCircle />} type="inactive" />
        <BusesCard title="Capacity" value="1280" description="Seats" icon={<Users />} type="capacity" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="h-[300px]">
          <BusStatusChart />
        </div>
        <div className="h-[300px]">
          <FleetChart />
        </div>
      </div>

      {/* Table */}
      <BusesTable />

      {/* ✅ Modal */}
      <AddBusModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />

    </main>
  );
}