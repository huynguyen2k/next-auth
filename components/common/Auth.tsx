import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '../../hooks';

interface AuthProps {
  children: ReactNode;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { isFirstLoading, data } = useAuth();

  useEffect(() => {
    if (!isFirstLoading && !data) router.push('/login');
  }, [data, isFirstLoading, router]);

  if (!data) return <h3>Loading ...</h3>;

  return <>{children}</>;
}
