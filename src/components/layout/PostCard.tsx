"use client";

import { noAvatar, notFound } from "@/assets";
import AuthContext from "@/context/AuthContext";
import { Post } from "@/types/types";
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { EditPostModal } from "./EditPostModal";
import { DeleteModal } from "./DeleteModal";

const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url);
};

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

  const { user } = useContext(AuthContext);

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
      <div className="p-3 rounded-lg shadow shadow-shadow border border-border bg-card overflow-hidden cursor-pointer">
        <div className="flex items-center justify-between">
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
              className="w-[32px] h-[32px] rounded-full"
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
        <hr className="text-secondary my-3" />
        <div className="relative w-full h-[350px] md:h-[450px]">
          <Image
            src={(isValidImageUrl(image) && image) || notFound}
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
              {tags?.length ? (
                tags.map((tag) => (
                  <span className="text-primary" key={tag}>
                    {tag}
                  </span>
                ))
              ) : (
                <span className="text-secondary">No tags available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostCard;
