import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  heading: string;
  subheading?: string;
  footer?: ReactNode;
};

export default function AuthPageShell({
  children,
  heading,
  subheading,
  footer,
}: Props) {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-50 md:flex-row">
      <header className="flex shrink-0 items-center justify-center border-b border-slate-200/80 bg-white px-4 py-3.5 shadow-sm md:hidden">
        <span className="text-base font-semibold tracking-tight text-blue-600 sm:text-lg">
          SafarHub
        </span>
      </header>

      <aside
        aria-hidden="true"
        className="relative hidden w-full shrink-0 flex-col justify-center bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-16 text-white md:flex md:w-1/2 lg:px-12 xl:px-16 2xl:px-20"
      >
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            SafarHub
          </h1>
          <p className="mt-4 max-w-md text-pretty text-sm leading-relaxed text-blue-100 sm:text-base lg:text-lg">
            Fleet, routes, staff, and finance in one workspace for transport
            operators.
          </p>
        </div>
      </aside>

      <main className="flex w-full flex-1 items-stretch justify-center px-4 py-8 sm:px-6 sm:py-10 md:items-center md:w-1/2 md:py-12 lg:px-10 lg:py-16 xl:py-20">
        <div className="flex w-full max-w-md flex-col justify-center">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {heading}
            </h2>
            {subheading ? (
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                {subheading}
              </p>
            ) : null}
            <div className="mt-6 sm:mt-8">{children}</div>
          </div>
          {footer ? <div className="mt-6 sm:mt-8">{footer}</div> : null}
        </div>
      </main>
    </div>
  );
}
