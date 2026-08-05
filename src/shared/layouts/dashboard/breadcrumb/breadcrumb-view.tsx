import { Link, useLocation } from 'react-router';
import type { BreadcrumbItem } from './breadcrumb-provider';
import { useBreadcrumbContext } from './use-breadcrumb';

function formatSegmentTitle(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export interface BreadcrumbProps {
  title?: string;
  description?: string;
  items?: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb(props: BreadcrumbProps) {
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

  const displayItems = props.items || contextBreadcrumbs.items || defaultItems;
  const displayTitle = props.title ?? contextBreadcrumbs.title;
  const displayDescription =
    props.description ?? contextBreadcrumbs.description;

  return (
    <nav aria-label="Breadcrumb" className={`w-full ${props.className || ''}`}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-sm">
        {displayItems.map((crumb, index) => {
          const isLast = index === displayItems.length - 1;

          return (
            <li
              key={crumb.href ? `${crumb.href}-${crumb.title}` : crumb.title}
              className="flex items-center gap-2"
            >
              {index > 0 && <span className="text-gray-400">/</span>}
              {isLast || !crumb.href ? (
                <span
                  className="font-medium text-gray-500"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {crumb.title}
                </span>
              ) : (
                <Link
                  to={crumb.href}
                  className="hover:text-primary text-gray-600 transition-colors hover:underline"
                >
                  {crumb.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>

      {(displayTitle || displayDescription) && (
        <div className="mt-2 flex flex-col gap-1">
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
    </nav>
  );
}
