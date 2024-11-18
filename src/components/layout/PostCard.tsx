"use client";

import { noAvatar } from "@/assets";
import { Post, User } from "@/types/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { EditPostModal } from "./EditPostModal";
import { DeleteModal } from "./DeleteModal";
import { useSelector } from "react-redux";
import Link from "next/link";
import { isValidImageUrl } from "@/lib/utils";

const PostCard = ({
  id,
  title,
  body,
  image,
  tags,
  created_at,
  comments_count,
  author,
}: Post) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { user } = useSelector((state: { auth: { user: User } }) => state.auth);

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  return (
    <>
      {/* edit modal  */}
      <EditPostModal
        id={id}
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
      />

      {/* delete modal  */}
      <DeleteModal
        id={id}
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
      />
      <div className="rounded-lg shadow shadow-shadow border border-border bg-card overflow-hidden cursor-pointer">
        <div className="px-3 pt-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={
                (isValidImageUrl(author?.profile_image) &&
                  author?.profile_image) ||
                noAvatar
              }
              alt={author.name || "Author"}
              width={32}
              height={32}
              className="w-[32px] h-[32px] rounded-full border-[3px] border-border"
            />
            <h4 className="text-xl font-semibold">{author.name}</h4>
          </div>
          {user?.id === author.id && (
            <Dropdown
              label={<BsThreeDots size={30} />}
              arrowIcon={false}
              inline
            >
              <Dropdown.Header>
                <span className="block text-sm">{author.name}</span>
                <span className="block truncate text-sm font-medium">
                  {author.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => handleDelete()}>
                Delete
              </Dropdown.Item>
            </Dropdown>
          )}
        </div>
        <hr className="text-secondary mt-3" />
        <Link href={`/posts/${id}`}>
          {isValidImageUrl(image) && (
            <div className="relative w-full mt-3 h-[300px] md:h-[450px]">
              <Image
                src={image}
                alt="post image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                className="absolute w-full h-full object-contain"
              />
            </div>
          )}
          <span className="px-1 text-xs text-secondary">{created_at}</span>
          <h3 className="px-3 text-2xl font-semibold my-2">{title}</h3>
          <p className="px-3 text-secondary">{body}</p>
          <hr className="text-secondary my-3" />
        </Link>
        <div className="px-3 pb-3 flex items-center gap-2">
          <MdModeEdit />
          <h3 className="text-secondary">{`(${comments_count}) comments`}</h3>
          <div>
            {tags &&
              tags.map((tag) => (
                <span
                  className="text-primary p-1 rounded-lg bg-secondary"
                  key={tag.name}
                >
                  {tag.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
