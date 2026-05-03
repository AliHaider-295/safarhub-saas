"use client";

export default function RoutesCard({
  title,
  value,
  description,
  icon,
  color = "blue",
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "red" | "purple";
}) {
  const styles = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      border: "border-blue-100",
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      border: "border-green-100",
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      border: "border-red-100",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      border: "border-purple-100",
    },
  };

  const current = styles[color] ?? styles.blue;

  return (
    <div
      className={`rounded-2xl border p-4 flex items-center justify-between shadow-sm hover:shadow-md transition ${current.bg} ${current.border}`}
    >
      {/* Left Content */}
      <div className="space-y-1">
        <p className="text-xs text-gray-500">{title}</p>

        <h2 className={`text-xl font-semibold ${current.text}`}>
          {value}
        </h2>

        <p className="text-xs text-gray-400">{description}</p>
      </div>

      {/* Icon */}
      <div
        className={`p-3 rounded-xl shadow-sm ${current.iconBg} ${current.iconColor}`}
      >
        <div className="w-5 h-5">{icon}</div>
      </div>
    </div>
  );
}