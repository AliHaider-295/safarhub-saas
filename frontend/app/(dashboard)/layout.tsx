import type { ReactNode } from "react";
import Sidebar from "../../components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}