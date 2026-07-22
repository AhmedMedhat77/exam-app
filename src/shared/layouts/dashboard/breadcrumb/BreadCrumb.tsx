import { Link, useLocation } from 'react-router';

function formatSegmentTitle(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function BreadCrumb() {
  const { pathname } = useLocation();

  const pathSegments = pathname.split('/').filter(Boolean);

  const breadcrumbs = [
    { title: 'Diplomas', href: '/' },
    ...pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      return {
        title: formatSegmentTitle(segment),
        href,
      };
    }),
  ];

  return (
    <header className="mb-6 flex items-center justify-between border-b border-gray-100 bg-white px-4 py-6">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm font-medium">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <li key={crumb.href} className="flex items-center gap-2">
                {index > 0 && <span className="text-gray-400">/</span>}
                {isLast ? (
                  <span
                    className={'flex items-center gap-1 text-gray-400'}
                    aria-current="page"
                  >
                    {crumb.title}
                  </span>
                ) : (
                  <Link
                    to={crumb.href}
                    className={
                      'hover:text-primary flex items-center gap-1 text-gray-500 transition-colors hover:underline'
                    }
                  >
                    {crumb.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </header>
  );
}
