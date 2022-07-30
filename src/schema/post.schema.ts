import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string(),
  body: z.string(),
});
export const getSinglePostSchema = z.object({
  postId: z.string(),
});

export type CreatePostInput = z.TypeOf<typeof createPostSchema>;
export type GetSinglePostInput = z.TypeOf<typeof getSinglePostSchema>;
