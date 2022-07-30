import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RequestOtpInput } from '../schema/user.schema';
import { trpc } from '../utils/trpc';
import VerifyToken from './VerifyToken';

type LoginFormProps = {};

const LoginForm: React.FC<LoginFormProps> = ({}) => {
  const router = useRouter();

  const { handleSubmit, register } = useForm<RequestOtpInput>();
  const { mutate, error, isSuccess } = trpc.useMutation(['users.request-otp']);
  const onSubmit = (value: RequestOtpInput) => {
    mutate(value);
  };
  const hash = router.asPath.split('#token=')[1];
  if (hash) {
    return <VerifyToken hash={hash} />;
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        {isSuccess && <p>Check your mail</p>}
        <h1>Login</h1>

        <input
          type='email'
          placeholder='gon.fricks@hxh.com'
          {...register('email')}
        />
        <br />

        <button type='submit'>Submit</button>
      </form>
      <Link href='/register'>Register</Link>
    </>
  );
};
export default LoginForm;
