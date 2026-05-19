"use client";

import { useState } from "react";
import { Profile } from "@/types/profile";

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Profile>) => void;
  email?: string; // read-only email
}

export default function CreateProfileModal({
  open,
  onClose,
  onSubmit,
  email,
}: Props) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    gender: "",
    dateOfBirth: "",
    department: "",
    role: "admin",
    isActive: true,
  });

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "isActive"
          ? value === "true"
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSubmit(form);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl w-[520px] space-y-5 shadow-xl"
      >
        <h2 className="text-2xl font-semibold">
          Create Profile
        </h2>

        {/* EMAIL (READ ONLY) */}
        <input
          value={email || ""}
          disabled
          className="input bg-gray-100 cursor-not-allowed"
          placeholder="Email"
        />

        {/* Full Name */}
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="input"
          required
        />

        {/* Phone */}
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input"
        />

        {/* Address */}
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="input"
        />

        {/* Gender */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        {/* DOB */}
        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="input"
        />

        {/* Department */}
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="input"
        />

        {/* ROLE */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input"
        >
          <option value="admin">Administrator</option>
          <option value="manager">Manager</option>
          <option value="account">Account Officer</option>
          <option value="driver">Driver</option>
        </select>

        {/* STATUS */}
        <select
          name="isActive"
          value={form.isActive.toString()}
          onChange={handleChange}
          className="input"
        >
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>

        {/* BUTTONS */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg"
          >
            Save Profile
          </button>

          <button
            type="button"
            onClick={onClose}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>

      <style jsx>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          padding: 10px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
}