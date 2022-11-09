import * as React from 'react';
import { authApi } from '../api-client';

export interface LoginPageProps {}

function LoginPage(props: LoginPageProps) {
  const handleLoginClick = async () => {
    try {
      const loginPayload = {
        username: 'test123',
        password: 'test123',
      };

      await authApi.login(loginPayload);
    } catch (error) {
      console.log('Failed to login: ', error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await authApi.logout();
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

      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={handleGetProfileClick}>Get profile</button>
    </div>
  );
}

export default LoginPage;