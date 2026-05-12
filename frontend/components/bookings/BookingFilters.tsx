import { Filter, Download } from "lucide-react";

export default function BookingFilters() {
  return (
    <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-4 items-center">

      <input type="date" className="input" />
      <input type="date" className="input" />

      <select className="input">
        <option>All Status</option>
      </select>

      <select className="input">
        <option>All Routes</option>
      </select>

      <select className="input">
        <option>All Buses</option>
      </select>

      <button className="btn-secondary flex items-center gap-2">
        <Filter size={16} />
        Filter
      </button>

      <button className="btn-secondary flex items-center gap-2">
        <Download size={16} />
        Export
      </button>
    </div>
  );
}