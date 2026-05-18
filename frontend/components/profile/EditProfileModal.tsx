"use client";

import { useState, useEffect } from "react";
import { Profile } from "@/types/profile";

interface Props {
  open: boolean;
  onClose: () => void;
  profile: Profile;
  onSubmit: (data: Partial<Profile>) => void;
}

export default function EditProfileModal({
  open,
  onClose,
  profile,
  onSubmit,
}: Props) {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    }
  }, [profile]);

  if (!open) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form); // 🚀 send to page.tsx
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-[400px]"
      >
        <h2 className="text-xl font-bold mb-4">
          Edit Profile
        </h2>

        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
        />

        <div className="flex gap-3 mt-4">
          <button type="submit">
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}