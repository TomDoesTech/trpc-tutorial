import Link from 'next/link';
import { trpc } from '../../utils/trpc';

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(['posts.all-posts']);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className='mb-8'>
        <Link href={`/posts/new`}>Create post</Link>
      </div>
      {data?.map(post => {
        return (
          <article className='bg-slate-200 p-4 rounded-md my-2' key={post.id}>
            <p className='text-xl my-2 font-bold uppercase'>{post.title}</p>
            <Link href={`/posts/${post.id}`}>Read post</Link>
          </article>
        );
      })}
    </div>
  );
}

export default PostListingPage;
