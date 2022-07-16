import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { RequestOtpInput } from '../schema/user.schema';
import { trpc } from '../utils/trpc';

const LoginPage = () => {
  const { handleSubmit, register } = useForm<RequestOtpInput>();
  const { mutate, error, isSuccess } = trpc.useMutation(['users.request-otp'], {
    onError: error => {},
    onSuccess: () => {},
  });
  const onSubmit = (value: RequestOtpInput) => {
    mutate(value);
  };
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
export default LoginPage;
