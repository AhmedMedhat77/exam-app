import { BreadcrumbProvider } from '@/shared/layouts/dashboard/breadcrumb/breadcrumb.context';
import Sidebar from '@/shared/layouts/dashboard/sidebar/sidebar';
import type { PropsWithChildren } from 'react';

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <BreadcrumbProvider>
      <main className="flex h-screen w-full flex-row">
        <Sidebar />
        <section className="flex w-full max-w-screen flex-1 flex-col overflow-y-auto bg-gray-50">
          <div className="px-4 py-8">{children}</div>
        </section>
      </main>
    </BreadcrumbProvider>
  );
}

export default DashboardLayout;
