import Error from 'next/error'
import { useRouter } from 'next/router'
import { trpc } from '../../utils/trpc'

function SinglePostPage() {
  const router = useRouter()

  const postId = router.query.postId as string

  const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }])

  if (isLoading) {
    return <p>Loading posts...</p>
  }

  if (!data) {
    return <Error statusCode={404} />
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  )
}

export default SinglePostPage
