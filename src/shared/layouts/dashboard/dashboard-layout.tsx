import BreadCrumb from '@/shared/layouts/dashboard/breadcrumb/BreadCrumb';
import Sidebar from '@/shared/layouts/dashboard/sidebar/sidebar';
import type { PropsWithChildren } from 'react';

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full flex-row">
      <Sidebar />
      <section className="w-full max-w-screen flex-1 overflow-y-auto bg-gray-50">
        <BreadCrumb />
        <div className="px-4">{children}</div>
      </section>
    </main>
  );
}

export default DashboardLayout;
