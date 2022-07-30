import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../utils/trpc';

type VerifyTokenProps = {
  hash: string;
};

const VerifyToken: React.FC<VerifyTokenProps> = ({ hash }) => {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery(['users.verify-otp', { hash }]);

  if (isLoading) {
    return <p>Verifying ...</p>;
  }
  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/');
  return <p>Redirecting ...</p>;
};
export default VerifyToken;
