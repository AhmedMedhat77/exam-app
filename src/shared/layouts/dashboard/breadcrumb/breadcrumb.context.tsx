import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface BreadcrumbData {
  title?: string;
  description?: string;
  items?: BreadcrumbItem[];
}

interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbData;
  setBreadcrumbs: React.Dispatch<React.SetStateAction<BreadcrumbData>>;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbs: {},
  setBreadcrumbs: () => {},
});

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

export function useBreadcrumbContext() {
  return useContext(BreadcrumbContext);
}

export function useBreadcrumb(data?: BreadcrumbData) {
  const { setBreadcrumbs } = useBreadcrumbContext();

  const title = data?.title;
  const description = data?.description;
  const items = data?.items;

  useEffect(() => {
    if (
      title !== undefined ||
      description !== undefined ||
      items !== undefined
    ) {
      setBreadcrumbs({ title, description, items });
    }
  }, [title, description, JSON.stringify(items), setBreadcrumbs]);
}
