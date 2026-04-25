"use client";

import BusesCard from "@/components/buses/BusesCard";
import BusesTable from "@/components/buses/BusesTable";
import BusStatusChart from "@/components/buses/BusStatusChart";
import FleetChart from "@/components/buses/FleetChart";

export default function BusesPage() {

  // ✅ ADD HERE
 
  return (
    <main className="p-4 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Buses</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add New Bus
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <BusesCard title="Total Buses" value="24" />
        <BusesCard title="Active" value="18" />
        <BusesCard title="Maintenance" value="3" />
        <BusesCard title="Inactive" value="3" />
        <BusesCard title="Capacity" value="1280" />
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

    </main>
  );
}