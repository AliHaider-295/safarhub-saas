import {
  LogIn,
  Lock,
  User,
  UserCog,
} from "lucide-react";

const stats = [
  {
    title: "Last Login",
    value: "20 May 2024, 10:30 AM",
    icon: LogIn,
  },
  {
    title: "Total Logins",
    value: "28",
    icon: User,
  },
  {
    title: "Profile Updates",
    value: "3",
    icon: UserCog,
  },
  {
    title: "Password Changes",
    value: "1",
    icon: Lock,
  },
];

export default function ActivitySummary() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Activity Summary
      </h2>

      <div className="space-y-6">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Icon size={20} />
                </div>

                <h4 className="text-sm font-medium text-gray-700">
                  {item.title}
                </h4>
              </div>

              <p className="text-sm font-semibold text-gray-900 text-right max-w-[140px]">
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}