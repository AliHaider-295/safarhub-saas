"use client";

import { Bus, TrendingUp } from "lucide-react";

type Props = {
  busNumber: string;
  totalIncome: number;
  trips?: number;
  occupancy?: number;
};

export default function BestBusCard({
  busNumber,
  totalIncome,
  trips = 0,
  occupancy = 0,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 h-full flex flex-col justify-between">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">Top Bus</p>
        <Bus size={16} className="text-blue-600" />
      </div>

      {/* Bus Info */}
      <div className="mt-2">
        <h3 className="text-lg font-semibold text-slate-900">
          {busNumber}
        </h3>
        <p className="text-sm text-green-600 font-medium">
          ${totalIncome}
        </p>
      </div>

      {/* Divider */}
      <div className="border-t my-2"></div>

      {/* Stats */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{trips} Trips</span>
        <span>{occupancy}% Load</span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-1 text-xs text-green-600 mt-1">
        <TrendingUp size={12} />
        <span>Best today</span>
      </div>
    </div>
  );
}