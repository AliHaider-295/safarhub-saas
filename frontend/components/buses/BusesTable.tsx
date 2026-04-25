"use client";

const buses = [
  {
    id: 1,
    number: "BUS-101",
    type: "Daewoo",
    capacity: 45,
    status: "Active",
    driver: "Ali",
    date: "24 Apr",
  },
];

export default function BusesTable() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="mb-4 font-semibold">All Buses</h2>

      <input
        placeholder="Search buses..."
        className="mb-4 border px-3 py-2 rounded w-full"
      />

      <table className="w-full text-sm">
        <thead className="border-b text-gray-500">
          <tr>
            <th>Bus</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {buses.map((b) => (
            <tr key={b.id} className="border-b">
              <td>{b.number}</td>
              <td>{b.type}</td>
              <td>{b.capacity}</td>
              <td>{b.status}</td>
              <td>{b.driver}</td>
              <td>{b.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}