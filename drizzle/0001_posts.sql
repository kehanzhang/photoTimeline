CREATE TABLE `posts` (
    `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
    `image_url` text NOT NULL,
    `description` text,
    `created_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updated_at` integer DEFAULT CURRENT_TIMESTAMP NOT NULL
);