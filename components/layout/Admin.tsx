import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks';
import { LayoutProps } from '../../pages/_app';
import { Auth } from '../common';

export function AdminLayout({ children }: LayoutProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.log('Failed to logout: ', error);
    }
  };

  return (
    <Auth>
      <div>
        <h1>Admin Layout</h1>
        <div>
          <button onClick={handleLogoutClick}>Logout</button>
        </div>

        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>

        <div>{children}</div>
      </div>
    </Auth>
  );
}
