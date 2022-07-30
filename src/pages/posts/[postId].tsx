import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';

function SinglePostPage() {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }]);

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className='bg-slate-200 p-4 rounded-md'>
      <Link href='/posts/'>All posts</Link>
      <h1 className='text-3xl my-8 font-bold uppercase'>{data?.title}</h1>
      <p className='bg-slate-50 p-4 rounded-md'>{data?.body}</p>
    </div>
  );
}

export default SinglePostPage;
