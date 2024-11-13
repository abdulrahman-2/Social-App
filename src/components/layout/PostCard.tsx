"use client";

import { Post } from "@/types/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";

const PostCard = (post: Post) => {
  const { title, body, image, tags, created_at, comments_count, author } = post;

  const session = true;
  return (
    <div className="p-3 rounded-lg shadow-md shadow-shadow border border-border bg-card overflow-hidden cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt={author.name}
            width={32}
            height={32}
            className="w-[32px] h-[32px] rounded-full"
          />
          <h4 className="text-xl font-semibold">{author.name}</h4>
        </div>
        {session && (
          <Dropdown label={<BsThreeDots size={30} />} arrowIcon={false} inline>
            <Dropdown.Header>
              <span className="block text-sm">{author.name}</span>
              <span className="block truncate text-sm font-medium">
                {author.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown>
        )}
      </div>
      <hr className="text-secondary my-3" />
      <div className="relative w-full h-[400px]">
        <Image
          src={image}
          alt="post image"
          width={400}
          height={400}
          loading="lazy"
          className="absolute w-full h-full object-cover"
        />
      </div>
      <div className="pt-1">
        <span className="text-xs text-secondary">{created_at}</span>
        <h3 className="text-2xl font-semibold my-2">{title}</h3>
        <p className="text-secondary">{body}</p>
        <hr className="text-secondary my-3" />
        <div className="flex items-center gap-2">
          <MdModeEdit />

          <h3 className="text-secondary">{`(${comments_count}) comments`}</h3>

          <div>
            {tags.map((tag) => (
              <span className="text-primary" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
