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
    <header className="flex items-center justify-between bg-white py-6 border-b border-gray-100 mb-6 px-4">
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
                      'transition-colors hover:underline flex items-center gap-1 text-gray-500 hover:text-primary'
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
