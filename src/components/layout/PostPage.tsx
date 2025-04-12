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
import Link from "next/link";

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

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await createComment(id, formData, token);
      toast.success("Comment Created successfully.");
      form.reset();
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
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
      <div className="mb-10 rounded-lg shadow shadow-shadow border border-border bg-card overflow-hidden">
        <div className="flex px-3 pt-3 items-center justify-between">
          <Link
            href={`/profile/${author.id}`}
            className="flex items-center gap-3"
          >
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
          </Link>
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
          <Image
            src={image}
            alt="post image"
            width={500}
            height={500}
            loading="lazy"
            className="w-full h-full object-contain"
          />
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
                      size="sm"
                      color="white"
                    />
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
