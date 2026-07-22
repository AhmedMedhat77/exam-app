import bookOpenCheckIcon from '@/assets/icons/book-open-check.svg';
import brainIcon from '@/assets/icons/brain.svg';
import folderCodeIcon from '@/assets/icons/folder-code.svg';
import rectangleEllipsisIcon from '@/assets/icons/rectangle-ellipsis.svg';
import { cn } from '@/shared/lib/utils';
import type React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex h-screen w-full items-center justify-center">
      <div className="grid h-screen w-full grid-cols-1 overflow-hidden md:grid-cols-2">
        <section
          className={cn(
            'relative hidden h-full flex-col justify-between overflow-hidden bg-[#EFF6FFBF]/75 p-8 md:flex md:p-16 lg:p-20',
            // before
            'before:bg-primary/10 before:absolute before:top-0 before:-right-20 before:size-125 before:rounded-full before:blur-3xl',
            // After
            'after:bg-primary/10 after:absolute after:-bottom-30 after:left-0 after:size-100 after:rounded-full after:blur-3xl'
          )}
        >
          {/* Top: Logo */}
          <div className="flex items-center gap-3">
            <img src={folderCodeIcon} alt="Exam App Logo" className="size-10" />
            <span className="text-primary text-xl font-semibold">Exam App</span>
          </div>

          {/* Center/Bottom: Content */}
          <div className="z-10 my-auto max-w-lg space-y-10">
            <h1 className="font-heading text-3xl leading-snug font-bold tracking-tight text-slate-900 md:text-[34px]">
              Empower your learning journey with our smart exam platform.
            </h1>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50/50">
                  <img
                    src={brainIcon}
                    alt="Tailored Diplomas"
                    className="h-6 w-6"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-primary font-mono text-base font-semibold">
                    Tailored Diplomas
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    Choose from specialized tracks like Frontend, Backend, and
                    Mobile Development.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50/50">
                  <img
                    src={bookOpenCheckIcon}
                    alt="Focused Exams"
                    className="h-6 w-6"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-primary font-mono text-base font-semibold">
                    Focused Exams
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    Access topic-specific tests including HTML, CSS, JavaScript,
                    and more.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-blue-200 bg-blue-50/50">
                  <img
                    src={rectangleEllipsisIcon}
                    alt="Smart Multi-Step Forms"
                    className="h-6 w-6"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-primary font-mono text-base font-semibold">
                    Smart Multi-Step Forms
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    Choose from specialized tracks like Frontend, Backend, and
                    Mobile Development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* radial Bottom */}
          <div className="bg-radial-to-t from-primary pointer-events-none absolute bottom-0 left-0 h-96 w-full via-transparent to-transparent" />
        </section>

        {/* Right side: Login Form */}
        <section className="flex items-center justify-center bg-white p-8">
          {children}
        </section>
      </div>
    </div>
  );
}
