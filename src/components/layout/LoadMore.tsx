"use client";

import { Post } from "@/types/types";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import { getPosts } from "@/lib/api";

let page: number = 2;

const LoadMore = () => {
  const { ref, inView } = useInView();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (inView) {
      const allPosts = async () => {
        const res = await getPosts(page);
        setPosts([...posts, ...res]);
        page++;
      };
      allPosts();
    }
  }, [inView, posts]);
  return (
    <div>
      <div className="flex flex-col gap-5 my-5">
        {posts.map((post: Post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      <div ref={ref} className="flex items-center justify-center mb-5">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    </div>
  );
};

export default LoadMore;
