import { Bus } from "lucide-react";
import Link from "next/link";

export default function AuthBrandHeader() {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-slate-200/90 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:h-16 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg outline-none transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md ring-1 ring-blue-600/20 sm:size-10"
            aria-hidden
          >
            <Bus className="size-[1.15rem] sm:size-5" strokeWidth={2.25} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl">
            SafarHub
          </span>
        </Link>
      </div>
    </header>
  );
}
