import LoadMore from "@/components/layout/LoadMore";
import PostCard from "@/components/layout/PostCard";
import { getPosts } from "@/lib/actions";
import { Post } from "@/types/types";
import React from "react";

const Home = async () => {
  const page = 3;
  const posts: Post[] = await getPosts(page);
  return (
    <div>
      <div className="flex flex-col gap-5 my-10">
        {posts.map((post: Post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <LoadMore />
    </div>
  );
};

export default Home;
