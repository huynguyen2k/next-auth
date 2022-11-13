import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '../../hooks';

interface AuthProps {
  children: ReactNode;
}

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const { isValidating, data } = useAuth();

  useEffect(() => {
    if (!isValidating && !data) router.push('/login');
  }, [data, isValidating, router]);

  if (isValidating || !data) return <h3>Loading ...</h3>;

  return <>{children}</>;
}
