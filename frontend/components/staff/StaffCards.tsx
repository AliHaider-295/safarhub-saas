"use client";

import {
  User,
  Users,
  ShieldCheck,
  Wrench,
  UserCheck,
} from "lucide-react";

export default function StaffCards() {
  const cards = [
    {
      title: "Drivers",
      value: 64,
      active: 56,
      inactive: 8,
      icon: User,
      color: "bg-blue-100 text-blue-600",
      progress: "bg-blue-500",
    },
    {
      title: "Conductors",
      value: 42,
      active: 38,
      inactive: 4,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
      progress: "bg-green-500",
    },
    {
      title: "Support Staff",
      value: 28,
      active: 22,
      inactive: 6,
      icon: Wrench,
      color: "bg-purple-100 text-purple-600",
      progress: "bg-purple-500",
    },
    {
      title: "Helpers",
      value: 31,
      active: 25,
      inactive: 6,
      icon: Users,
      color: "bg-orange-100 text-orange-600",
      progress: "bg-orange-500",
    },
    {
      title: "Security",
      value: 16,
      active: 14,
      inactive: 2,
      icon: ShieldCheck,
      color: "bg-teal-100 text-teal-600",
      progress: "bg-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const percentage = (card.active / card.value) * 100;

        return (
          <div
            key={i}
            className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">{card.title}</p>
                <h2 className="text-lg font-semibold text-gray-800">
                  {card.value}
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
                  {card.active}
                </span>
              </span>

              <span>
                Inactive:{" "}
                <span className="text-red-500 font-medium">
                  {card.inactive}
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