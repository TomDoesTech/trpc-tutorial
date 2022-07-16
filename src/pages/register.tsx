import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CreateUserInput } from '../schema/user.schema';
import { trpc } from '../utils/trpc';

const RegisterPage = () => {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const router = useRouter();
  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onError: error => {},
    onSuccess: () => {
      router.push('/login');
    },
  });
  const onSubmit = (value: CreateUserInput) => {
    mutate(value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input
          type='email'
          placeholder='gon.fricks@hxh.com'
          {...register('email')}
        />
        <br />
        <input placeholder='Gon Fricks' {...register('name')} />
        <button type='submit'>Submit</button>
      </form>
      <Link href='/login'>Login</Link>
    </>
  );
};
export default RegisterPage;
