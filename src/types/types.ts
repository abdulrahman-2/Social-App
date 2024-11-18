// Define the Author type
export type Author = {
  id: number;
  profile_image: string;
  is_fake: number;
  username: string;
  name: string;
  email: string | null;
  email_verified_at: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
};

export type Tag = {
  name: string;
  arabic_name: string;
  description: string;
};

export type CommentAuthor = {
  id: number;
  profile_image: string;
  is_fake: number;
  username: string;
  name: string;
  email: string | null;
  email_verified_at: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string;
};

export type Comment = {
  id: number;
  body: string;
  author: CommentAuthor;
};

export type Post = {
  id: number;
  title: string | null;
  body: string;
  image: string;
  tags?: Tag[];
  created_at: string;
  comments_count: number;
  author: Author;
  comments?: Comment[];
};

export type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  comments_count: number;
  posts_count: number;
  profile_image: string;
};

export type UserData = {
  token: string;
  user: User;
};
