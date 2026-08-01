import { Link, useLocation } from 'react-router';
import {
  useBreadcrumbContext,
  type BreadcrumbItem,
} from './breadcrumb.context';

function formatSegmentTitle(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface BreadCrumbProps {
  title?: string;
  description?: string;
  items?: BreadcrumbItem[];
}

export default function BreadCrumb(props: BreadCrumbProps) {
  const { pathname } = useLocation();
  const { breadcrumbs: contextBreadcrumbs } = useBreadcrumbContext();

  const pathSegments = pathname.split('/').filter(Boolean);

  const defaultItems: BreadcrumbItem[] = [
    { title: 'Diplomas', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      return {
        title: formatSegmentTitle(segment),
        href,
      };
    }),
  ];

  const defaultTitle =
    pathSegments.length > 0
      ? formatSegmentTitle(pathSegments[pathSegments.length - 1])
      : 'Diplomas';

  const displayItems = props.items || contextBreadcrumbs.items || defaultItems;
  const displayTitle = props.title ?? contextBreadcrumbs.title ?? defaultTitle;
  const displayDescription =
    props.description ?? contextBreadcrumbs.description;

  return (
    <header className="mb-6 flex flex-col gap-2 border-b border-gray-100 bg-white px-6 py-5 shadow-xs">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm font-medium">
          {displayItems.map((crumb, index) => {
            const isLast = index === displayItems.length - 1;

            return (
              <li
                key={crumb.href ? `${crumb.href}-${index}` : index}
                className="flex items-center gap-2"
              >
                {index > 0 && <span className="text-gray-400">/</span>}
                {isLast || !crumb.href ? (
                  <span
                    className="flex items-center gap-1 text-gray-400"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {crumb.title}
                  </span>
                ) : (
                  <Link
                    to={crumb.href}
                    className="hover:text-primary flex items-center gap-1 text-gray-500 transition-colors hover:underline"
                  >
                    {crumb.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      {(displayTitle || displayDescription) && (
        <div className="mt-1 flex flex-col gap-1">
          {displayTitle && (
            <h1 className="font-mono text-2xl font-semibold tracking-tight text-gray-900">
              {displayTitle}
            </h1>
          )}
          {displayDescription && (
            <p className="text-sm text-gray-500">{displayDescription}</p>
          )}
        </div>
      )}
    </header>
  );
}
