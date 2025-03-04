import db from './db';
import { posts, type Post } from './schema';
import { desc } from 'drizzle-orm';

export async function createPost(imageUrl: string, description: string): Promise<void> {
  await db.insert(posts).values({
    imageUrl,
    description: description || null,
  });
}

export async function getPosts(): Promise<Post[]> {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
}