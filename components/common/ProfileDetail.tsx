import useSWR from 'swr';

export interface ProfileDetail {
  userId: string;
}

export function ProfileDetail({ userId }: ProfileDetail) {
  const { data, mutate, error, isValidating } = useSWR(`/students/${userId}`, {
    revalidateIfStale: false,
    revalidateOnMount: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  });

  const handleProfileChange = () => {
    mutate({ name: 'user 123' });
  };

  return (
    <div>
      <h2>User profile</h2>
      <button onClick={handleProfileChange}>Change profile</button>

      <div>
        <h3>{data?.name ?? '---'}</h3>
      </div>
    </div>
  );
}
