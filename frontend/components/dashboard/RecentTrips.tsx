"use client";

type Trip = {
  id: number;
  bus: string;
  route: string;
  income: number;
  date: string;
};

const trips: Trip[] = [
  {
    id: 1,
    bus: "Bus A-12",
    route: "Lahore → Islamabad",
    income: 1200,
    date: "2026-04-23",
  },
  {
    id: 2,
    bus: "Bus B-07",
    route: "Karachi → Hyderabad",
    income: 900,
    date: "2026-04-23",
  },
  {
    id: 3,
    bus: "Bus C-21",
    route: "Multan → Lahore",
    income: 700,
    date: "2026-04-23",
  },
  {
    id: 4,
    bus: "Bus D-05",
    route: "Faisalabad → Rawalpindi",
    income: 1500,
    date: "2026-04-23",
  },  
  {
    id: 5,
    bus: "Bus E-18",
    route: "Islamabad → Peshawar",
    income: 1100,
    date: "2026-04-23",
  },
  {
    id: 6,
    bus: "Bus F-09",
    route: "Karachi → Sukkur",
    income: 800,
    date: "2026-04-23",
  },
  {
    id: 7,
    bus: "Bus G-14",
    route: "Lahore → Multan",
    income: 950,
    date: "2026-04-23",
  },
  {
    id: 8,
    bus: "Bus H-22",
    route: "Rawalpindi → Murree",
    income: 1300,
    date: "2026-04-23",
  },
           
];

export default function RecentTrips() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-4 font-semibold text-lg">Recent Trips</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2">Bus</th>
              <th className="py-2">Route</th>
              <th className="py-2">Income</th>
              <th className="py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {trips.map((trip) => (
              <tr
                key={trip.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-2 font-medium">{trip.bus}</td>
                <td className="py-2">{trip.route}</td>
                <td className="py-2 text-green-600 font-semibold">
                  ${trip.income}
                </td>
                <td className="py-2 text-gray-500">{trip.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}