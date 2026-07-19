import folderCodeIcon from '@/assets/icons/folder-code.svg';
import brainIcon from '@/assets/icons/brain.svg';
import bookOpenCheckIcon from '@/assets/icons/book-open-check.svg';
import rectangleEllipsisIcon from '@/assets/icons/rectangle-ellipsis.svg';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-muted">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full overflow-hidden">
        <section className="bg-[#EFF6FFBF]/75 relative hidden md:flex flex-col justify-between p-8 md:p-16 lg:p-20  h-full  overflow-hidden">
          <div className="size-125 bg-primary/10 blur-3xl rounded-full absolute top-0 -right-20 " />
          <div className="size-100 bg-primary/10 blur-3xl rounded-full absolute -bottom-30 left-0 " />
          {/* Top: Logo */}
          <div className="flex items-center gap-3">
            <img src={folderCodeIcon} alt="Exam App Logo" className="size-10" />
            <span className="font-semibold text-primary text-xl">Exam App</span>
          </div>

          {/* Center/Bottom: Content */}
          <div className="my-auto max-w-lg space-y-10 z-10">
            <h1 className="text-3xl md:text-[34px] font-bold text-slate-900 leading-snug tracking-tight">
              Empower your learning journey with our smart exam platform.
            </h1>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-blue-200 bg-blue-50/50 shrink-0">
                  <img
                    src={brainIcon}
                    alt="Tailored Diplomas"
                    className="w-6 h-6"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-mono font-semibold text-primary text-base">
                    Tailored Diplomas
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Choose from specialized tracks like Frontend, Backend, and
                    Mobile Development.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-blue-200 bg-blue-50/50 shrink-0">
                  <img
                    src={bookOpenCheckIcon}
                    alt="Focused Exams"
                    className="w-6 h-6"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-mono font-semibold text-primary text-base">
                    Focused Exams
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Access topic-specific tests including HTML, CSS, JavaScript,
                    and more.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg border border-blue-200 bg-blue-50/50 shrink-0">
                  <img
                    src={rectangleEllipsisIcon}
                    alt="Smart Multi-Step Forms"
                    className="w-6 h-6"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-mono font-semibold text-primary text-base">
                    Smart Multi-Step Forms
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Choose from specialized tracks like Frontend, Backend, and
                    Mobile Development.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* radial Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-96 bg-radial-to-t from-primary via-transparent to-transparent pointer-events-none" />
        </section>

        {/* Right side: Login Form */}
        <section className="flex items-center justify-center p-8 bg-white">
          {children}
        </section>
      </div>
    </div>
  );
}
