import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  BreadcrumbContext,
  type BreadcrumbData,
  type BreadcrumbItem,
} from './breadcrumb-context';

export type { BreadcrumbData, BreadcrumbItem };

export function BreadcrumbProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbData>({});
  const { pathname } = useLocation();

  useEffect(() => {
    setBreadcrumbs({});
  }, [pathname]);

  const value = React.useMemo(
    () => ({ breadcrumbs, setBreadcrumbs }),
    [breadcrumbs]
  );

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
}
