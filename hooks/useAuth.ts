import useSWR from 'swr';
import { PublicConfiguration } from 'swr/dist/types';
import { authApi } from '../api-client';

export interface LoginPayload {
  username: string;
  password: string;
}

export function useAuth(options?: Partial<PublicConfiguration>) {
  const { data, error, mutate, isValidating } = useSWR<any>('/profile', {
    revalidateIfStale: true,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
    dedupingInterval: 60 * 60 * 1000,
    ...options,
  });

  const isFirstLoading = data === undefined && error === undefined;

  const login = async (data: LoginPayload) => {
    await authApi.login(data);
    await mutate();
  };

  const logout = async () => {
    await authApi.logout();
    mutate(null, { revalidate: false });
  };

  return { data, error, isValidating, isFirstLoading, login, logout };
}
