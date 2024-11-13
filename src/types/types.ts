// Define the Author type
type Author = {
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

// Define the Post type, including the author
export type Post = {
  id: number;
  title: string;
  body: string;
  image: string;
  tags: string[];
  created_at: string;
  comments_count: number;
  author: Author;
};
