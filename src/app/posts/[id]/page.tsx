import PostPage from "@/components/layout/PostPage";
import { getSinglePost } from "@/lib/api";
import React from "react";

const Post = async ({ params }: { params: { id: number } }) => {
  const { id } = params;

  const post = await getSinglePost(id);
  return (
    <div>
      <PostPage post={post} />
    </div>
  );
};

export default Post;
