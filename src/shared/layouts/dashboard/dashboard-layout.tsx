import Sidebar from '@/shared/layouts/dashboard/sidebar/sidebar';
import type { PropsWithChildren } from 'react';

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full flex-row">
      <Sidebar />
      <section className="flex-1 w-full max-w-screen overflow-y-auto px-6">
        {children}
      </section>
    </main>
  );
}

export default DashboardLayout;
