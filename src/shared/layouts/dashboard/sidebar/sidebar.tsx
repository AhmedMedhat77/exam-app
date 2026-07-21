import { Logo } from '@/app/layouts/sidebar/components/logo';
import UserInfo from '@/app/layouts/sidebar/components/user-info';
import { ROUTES } from '@/app/routes';
import { Link } from 'react-router';

function Sidebar() {
  return (
    <aside className="w-90.5 border-r border-blue-50 bg-blue-50  flex flex-col justify-between p-10">
      <div className="flex flex-col gap-10">
        <Logo />
        {/* Routes  */}
        <ul className="flex flex-col">
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
          <li>
            <Link to={ROUTES.HOME}>Home</Link>
          </li>
        </ul>
      </div>
      {/* Footer */}
      <UserInfo />
    </aside>
  );
}

export default Sidebar;
