import type { ReactNode } from "react";

import AuthBrandHeader from "@/components/layout/AuthBrandHeader";

type Props = {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthCenteredLayout({
  title,
  description,
  children,
  footer,
}: Props) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90">
      <AuthBrandHeader />

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12 xl:py-16">
        <div className="w-full max-w-[min(100%,28rem)]">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-lg shadow-slate-200/60 sm:p-8 lg:p-9">
            <div className="text-center sm:text-left">
              <h1 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
                {title}
              </h1>
              {description ? (
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
                  {description}
                </p>
              ) : null}
            </div>

            <div className="mt-6 sm:mt-8">{children}</div>

            {footer ? (
              <div className="mt-6 border-t border-slate-100 pt-6 sm:mt-8 sm:pt-7">
                {footer}
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
