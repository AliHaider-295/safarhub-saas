"use client";

export default function RoutesCard({
  title,
  value,
  description,
  icon,
  color = "blue",
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red" | "purple";
}) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    red: "bg-red-100 text-red-600",
    purple: "bg-purple-100 text-purple-600",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-3">
      <div className={`p-2 rounded-lg ${colors[color]}`}>
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}