import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('../components/LoginForm'), {
  ssr: false,
});
const LoginPage = () => {
  return <LoginForm />;
};
export default LoginPage;
