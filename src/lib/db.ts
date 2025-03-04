import { drizzle } from 'drizzle-orm/sqlite';
import { sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Define the posts table schema
export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  imageUrl: text('image_url').notNull(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

// TODO: Initialize SQLite database connection
// For now, we'll use mock data and localStorage
export const getPosts = async () => {
  const storedPosts = localStorage.getItem('posts');
  return storedPosts ? JSON.parse(storedPosts) : [];
};

export const createPost = async (imageUrl: string, description: string | null) => {
  const storedPosts = await getPosts();
  const newPost = {
    id: Date.now(),
    imageUrl,
    description,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  
  const updatedPosts = [newPost, ...storedPosts];
  localStorage.setItem('posts', JSON.stringify(updatedPosts));
  return newPost;
};