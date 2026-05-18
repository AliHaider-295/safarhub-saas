import PermissionCard from "./PermissionCard";

const permissions = [
  "Dashboard",
  "Routes",
  "Buses",
  "Bookings",
  "Staff",
  "Reports",
  "Expenses",
  "Revenue",
  "Settings",
];

export default function PermissionsOverview() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Permissions Overview
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {permissions.map((item, index) => (
          <PermissionCard
            key={index}
            title={item}
          />
        ))}
      </div>
    </div>
  );
}