import type { ReactNode } from "react";
import { Toaster } from "sonner";

import "@/styles/globals.css";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-dvh bg-slate-50 text-slate-900 antialiased font-sans">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}