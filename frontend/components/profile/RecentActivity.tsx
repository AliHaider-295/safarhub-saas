const activities = [
  {
    title: "Login",
    time: "20 May 2024, 10:30 AM",
    status: "Success",
  },
  {
    title: "Updated Profile",
    time: "18 May 2024, 02:15 PM",
    status: "Success",
  },
  {
    title: "Changed Password",
    time: "16 May 2024, 11:20 AM",
    status: "Info",
  },
  {
    title: "Failed Login Attempt",
    time: "15 May 2024, 08:10 PM",
    status: "Failed",
  },
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between"
          >
            <div>
              <h4 className="text-sm font-semibold text-gray-800">
                {item.title}
              </h4>

              <p className="text-xs text-gray-500 mt-1">
                {item.time}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-lg font-medium
                ${
                  item.status === "Success"
                    ? "bg-green-100 text-green-700"
                    : item.status === "Info"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }
              `}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}