import { noAvatar } from "@/assets";
import { isValidImageUrl } from "@/lib/utils";
import { Post, User } from "@/types/types";
import Image from "next/image";
import React from "react";
import PostCard from "./PostCard";

const ProfilePage = ({ user, posts }: { user: User; posts: Post[] }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold mt-10 mb-5">Profile</h1>
      <div className="flex flex-col sm:flex-row gap-7 sm:items-center items-start justify-between shadow-sm shadow-shadow bg-card rounded-lg p-5">
        <Image
          src={
            (isValidImageUrl(user?.profile_image) && user?.profile_image) ||
            noAvatar
          }
          alt={user?.name}
          width={200}
          height={200}
          className="w-32 h-32 mx-auto md:w-40 md:h-40 rounded-full border-[3px] border-border"
        />
        <div className="flex flex-col gap-7">
          <h2 className="text-lg md:text-xl font-semibold">{user?.email}</h2>
          <h2 className="text-lg md:text-xl font-semibold">{user?.name}</h2>
          <h2 className="text-lg md:text-xl font-semibold">{user?.username}</h2>
        </div>
        <div className="flex flex-col gap-7">
          <h2 className="text-4xl font-semibold">
            {user?.posts_count}{" "}
            <sub className="font-normal text-secondary text-lg">Posts</sub>
          </h2>
          <h2 className="text-4xl font-semibold">
            {user?.comments_count}{" "}
            <sub className="font-normal text-secondary text-lg">Comments</sub>
          </h2>
        </div>
      </div>
      <h1 className="text-2xl font-bold mt-10 mb-5">All Posts</h1>
      <div className="flex flex-col gap-5 mb-10">
        {posts.map((post: Post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
