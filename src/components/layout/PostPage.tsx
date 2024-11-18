"use client";

import { noAvatar } from "@/assets";
import { Post, User } from "@/types/types";
import { Button, Dropdown, Spinner, TextInput } from "flowbite-react";
import Image from "next/image";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import { EditPostModal } from "./EditPostModal";
import { DeleteModal } from "./DeleteModal";
import { isValidImageUrl } from "@/lib/utils";
import CommentRenderer from "./CommentRenderer";
import TagRenderer from "./TagRenderer";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions";

const PostPage = ({ post }: { post: Post }) => {
  const {
    id,
    title,
    body,
    image,
    tags,
    created_at,
    comments_count,
    author,
    comments,
  } = post;
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, token } = useSelector(
    (state: { auth: { user: User; token: string } }) => state.auth
  );

  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCreateComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createComment(id, formData, token);
      toast.success("Comment Created successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to comment. Please try again.");
    }
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
      <h1 className="mt-10 mb-5 text-xl font-bold">{`${author.name} Post's`}</h1>
      <div className="mb-10 rounded-lg shadow shadow-shadow border border-border bg-card overflow-hidden cursor-pointer">
        <div className="flex px-3 pt-3 items-center justify-between">
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
        <hr className="text-secondary my-3" />
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
        <div>
          <span className="px-1 text-xs text-secondary">{created_at}</span>
          <h3 className="px-3 text-2xl font-semibold my-2">{title}</h3>
          <p className="px-3 text-secondary">{body}</p>
          <hr className="text-secondary my-3" />
          <div className="px-3 flex items-center gap-2">
            <MdModeEdit />
            <h3 className="text-secondary">{`(${comments_count}) comments`}</h3>
            <div>{tags && <TagRenderer tags={tags} />}</div>
          </div>
          <hr className="text-secondary my-3" />
          {comments && <CommentRenderer comments={comments} />}
          <div className="px-3 pb-3">
            <form
              onSubmit={handleCreateComment}
              className="flex items-center gap-3 w-full"
            >
              <div className="w-full">
                <TextInput
                  type="text"
                  name="body"
                  placeholder="Add Comment"
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" color="blue">
                {loading ? (
                  <>
                    <Spinner
                      aria-label="Extra large spinner example"
                      size="md"
                      color="white"
                    />
                    <span className="ml-2">Loading...</span>
                  </>
                ) : (
                  "Comment"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostPage;
