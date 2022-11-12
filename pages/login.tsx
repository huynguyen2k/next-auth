import { useRouter } from 'next/router';
import * as React from 'react';
import { authApi } from '../api-client';
import { useAuth } from '../hooks';

export interface LoginPageProps {}

function LoginPage(props: LoginPageProps) {
  const router = useRouter();
  const { data: profile, login, logout } = useAuth({ revalidateOnMount: false });

  const handleLoginClick = async () => {
    try {
      await login({
        username: 'test123',
        password: 'test123',
      });
      router.push('/about');
    } catch (error) {
      console.log('Failed to login: ', error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
    } catch (error) {
      console.log('Failed to logout: ', error);
    }
  };

  const handleGetProfileClick = async () => {
    try {
      await authApi.profile();
    } catch (error) {
      console.log('Failed to get profile: ', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>

      <div>
        <h4>Profile</h4>
        <p>{profile ? JSON.stringify(profile) : 'none'}</p>
      </div>

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={handleGetProfileClick}>Get profile</button>
      <button onClick={() => router.push('/about')}>Go to about</button>
    </div>
  );
}

export default LoginPage;
