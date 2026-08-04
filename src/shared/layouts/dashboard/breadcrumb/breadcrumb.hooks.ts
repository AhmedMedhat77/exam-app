import { useContext, useEffect } from 'react';
import {
  BreadcrumbContext,
  type BreadcrumbContextType,
  type BreadcrumbData,
} from './breadcrumb-context';

export function useBreadcrumbContext(): BreadcrumbContextType {
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
  }, [title, description, items, setBreadcrumbs]);
}
