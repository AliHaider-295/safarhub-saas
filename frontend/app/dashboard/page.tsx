"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "@/utils/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        Dashboard
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
        Key metrics and activity will appear here.
      </p>
    </main>
  );
}