import { useContext, useEffect, useMemo } from 'react';
import {
  BreadcrumbContext,
  type BreadcrumbContextType,
  type BreadcrumbData,
} from './breadcrumb-context';

export function useBreadcrumbContext(): BreadcrumbContextType {
  return useContext(BreadcrumbContext);
}

export function useBreadcrumb(data: BreadcrumbData = {}) {
  const { setBreadcrumbs } = useBreadcrumbContext();

  const title = data?.title;
  const description = data?.description;
  const items = data?.items;

  const itemsString = useMemo(() => JSON.stringify(items), [items]);

  useEffect(() => {
    if (
      title !== undefined ||
      description !== undefined ||
      items !== undefined
    ) {
      setBreadcrumbs({ title, description, items });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, itemsString, setBreadcrumbs]);
}
