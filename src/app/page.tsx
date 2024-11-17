import { AddPostModal } from "@/components/layout/AddPostModal";
import LoadMore from "@/components/layout/LoadMore";
import PostCard from "@/components/layout/PostCard";
import { getPosts } from "@/lib/actions";
import { Post } from "@/types/types";
import React from "react";

const Home = async () => {
  const page = 1;
  const posts: Post[] = await getPosts(page);
  return (
    <div>
      <div className="flex flex-col gap-5 mt-10 mb-5">
        {posts.map((post: Post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <LoadMore />
      <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10">
        <AddPostModal />
      </div>
    </div>
  );
};

export default Home;
