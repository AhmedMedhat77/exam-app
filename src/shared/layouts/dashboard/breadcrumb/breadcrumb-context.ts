import { createContext, type Dispatch, type SetStateAction } from 'react';

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

export interface BreadcrumbData {
  title?: string;
  description?: string;
  items?: BreadcrumbItem[];
}

export interface BreadcrumbContextType {
  breadcrumbs: BreadcrumbData;
  setBreadcrumbs: Dispatch<SetStateAction<BreadcrumbData>>;
}

export const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumbs: {},
  setBreadcrumbs: () => {},
});
