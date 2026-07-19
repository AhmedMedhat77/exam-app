import type { PropsWithChildren } from 'react';

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="flex h-screen w-full flex-col">
      <header>
        <h1>Dashboard Layout</h1>
      </header>
      <section>{children}</section>
    </main>
  );
}

export default DashboardLayout;
