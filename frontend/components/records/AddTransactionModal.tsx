"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";
import { authFetch } from "@/lib/api"; // ✅ added

type Bus = {
  id: string;
  busNumber?: string;
  bus_number?: string;
  number?: string;
};

type Route = {
  id: string;
  from?: string;
  to?: string;
  start?: string;
  end?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function AddTransactionModal({
  open,
  onClose,
  onSuccess,
}: Props) {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [staff, setStaff] = useState<any[]>([]);

  const [form, setForm] = useState({
    busId: "",
    routeId: "",
    date: "",
    type: "income",
    category: "",
    amount: "",
    passengers: "",
    paymentMethod: "",
    description: "",
    staffId: ""
  });

  useEffect(() => {
    if (!open) return;
  
    setForm({
      type: "income",
  
      category: "",
  
      amount: "",
     
      passengers: "",

      paymentMethod: "cash",
  
      description: "",
  
      busId: "",
      routeId: "",
      staffId: "",
  
      date: "",
    });
  
    const fetchData = async () => {
      try {
        const [busRes, routeRes, staffRes] = await Promise.all([
          authFetch("/buses"),
          authFetch("/routes"),
          authFetch("/staff"),
        ]);
  
        if (!busRes.ok || !routeRes.ok || !staffRes.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const busJson = await busRes.json();
        const routeJson = await routeRes.json();
  
        const busList = Array.isArray(busJson)
          ? busJson
          : busJson?.data || busJson?.buses || [];
  
        const routeList = Array.isArray(routeJson)
          ? routeJson
          : routeJson?.data || routeJson?.routes || [];
          const staffJson = await staffRes.json();

         const staffList = Array.isArray(staffJson)
        ? staffJson
       : staffJson?.data || staffJson?.staff || [];

        setStaff(staffList);
  
        setBuses(busList);
        setRoutes(routeList);
  
      } catch (err) {
        console.error(err);
        toast.error("Failed to load buses, routes or staff");
      }
    };
  
    fetchData();
  
  }, [open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const {
      type,
      category,
      amount,
      paymentMethod,
      description,
      busId,
      routeId,
      staffId,
      date,
    } = form;

    if (!type || !category || !amount || !date) {
      console.log("FORM DATA:", form);
      toast.error("Please fill all required fields");
      return;
    }
   
    
    // BUS REQUIRED
    if (
      ["fuel", "maintenance", "repair"].includes(category) &&
      !busId
    ) {
      toast.error("Please select a bus");
      return;
    }
    
    // ROUTE REQUIRED
    if (
      ["ticket", "toll", "parcel"].includes(category) &&
      !routeId
    ) {
      toast.error("Please select a route");
      return;
    }
    if (
      form.category === "ticket" &&
      Number(form.passengers) <= 0
    ) {
      toast.error("Please enter passenger count");
      return;
    }
    
    // STAFF REQUIRED
    if (
      category === "salary" &&
      !staffId
    ) {
      toast.error("Please select a staff member");
      return;
    }

    if (isNaN(new Date(date).getTime())) {
      toast.error("Invalid date");
      return;
    }
    if (Number(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    console.log("SUBMIT DEBUG:", {
      busId,
      routeId,
    });

    setIsSubmitting(true);

    try {
      const res = await authFetch("/transactions", { // ✅ FIXED
        method: "POST",
        body: JSON.stringify({
         
          type: form.type,

          category: form.category,
          
          amount: Number(form.amount),
          passengers: Number(form.passengers || 0),
          paymentMethod: form.paymentMethod,
          
          description: form.description,
          
          busId: form.busId || null,
          routeId: form.routeId || null,
          staffId: form.staffId || null,
          
          date: form.date,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to create transaction");
      }

      toast.success("Transaction added successfully");

      onClose();
      onSuccess();

    } catch (err) {
      console.error(err);
      toast.error("Failed to add transaction");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-5">
  
        <h2 className="text-2xl font-bold">
          Add Transaction
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-4">
  
          {/* TYPE */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
  
          {/* CATEGORY */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="">Select Category</option>
  
            {form.type === "income" ? (
              <>
                <option value="ticket">
                  Ticket Sales
                </option>
  
                <option value="parcel">
                  Parcel Service
                </option>
  
                <option value="other_income">
                  Other Income
                </option>
              </>
            ) : (
              <>
                <option value="fuel">
                  Fuel
                </option>
  
                <option value="maintenance">
                  Maintenance
                </option>
  
                <option value="salary">
                  Staff Salary
                </option>
  
                <option value="toll">
                  Toll Tax
                </option>
  
                <option value="repair">
                  Repair
                </option>
              </>
            )}
          </select>

  
          {/* AMOUNT */}
          <input
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={form.amount}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
         {form.type === "income" &&
         form.category === "ticket" && (
  <input
    required
    type="number"
    name="passengers"
    placeholder="Passengers Count"
    value={form.passengers}
    onChange={handleChange}
    className="w-full border p-3 rounded-lg"
  />
)}


          {/* PAYMENT METHOD */}
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="bank">
              Bank Transfer
            </option>
          </select>
  
          {/* DATE */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />
  
          {/* BUS DROPDOWN */}
          {["fuel", "maintenance", "repair"].includes(form.category) && (
  <select
    name="busId"
    value={form.busId}
    onChange={handleChange}
    className="w-full border p-3 rounded-lg"
  >
    <option value="">
      Select Bus
    </option>

    {buses.map((bus) => (
      <option
        key={bus.id}
        value={bus.id}
      >
        {bus.busNumber ||
          bus.bus_number ||
          bus.number ||
          "Bus"}
      </option>
    ))}
  </select>
)}
  
          {/* ROUTE DROPDOWN */}
          {(form.category === "ticket" ||
            form.category === "toll" ||
            form.category === "parcel") && (
            <select
              name="routeId"
              value={form.routeId}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg"
            >
              <option value="">
                Select Route
              </option>
  
              {routes.map((route) => (
                <option
                  key={route.id}
                  value={route.id}
                >
                  {(route.from ||
                    route.start ||
                    "From")}{" "}
                  →
                  {(route.to ||
                    route.end ||
                    "To")}
                </option>
              ))}
            </select>
          )}
          

          {/* STAFF DROPDOWN */}
{form.category === "salary" && (
  <select
    name="staffId"
    value={form.staffId}
    onChange={handleChange}
    className="w-full border p-3 rounded-lg"
  >
    <option value="">
      Select Staff Member
    </option>

    {staff.map((member) => (
      <option key={member.id} value={member.id}>
        {member.name}
      </option>
    ))}
  </select>
)}
  
          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            className="w-full border p-3 rounded-lg"
            rows={4}
          />
  
          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
  
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
            >
              Cancel
            </Button>
  
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Saving..."
                : "Add Transaction"}
            </Button>
  
          </div>
  
        </form>
  
      </div>
    </div>
  );
}