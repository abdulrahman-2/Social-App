"use client";

import { editPost } from "@/lib/actions";
import { getSinglePost } from "@/lib/api";
import { Post } from "@/types/types";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export function EditPostModal({
  id,
  openModal,
  setOpenModal,
}: {
  id: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const { token } = useSelector(
    (state: { auth: { token: string } }) => state.auth
  );

  const onCloseModal = () => {
    setOpenModal(false);
    setTitle(post?.body || "");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  useEffect(() => {
    if (openModal) {
      const fetchPost = async () => {
        try {
          const data = await getSinglePost(id);
          setPost(data);
          setTitle(data.title || "");
          setBody(data.body || "");
        } catch (error) {
          console.error(error);
          toast.error("Failed to load post");
        }
      };
      fetchPost();
    }
  }, [id, openModal]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    if (imageRef.current?.files?.[0]) {
      const imageFile = imageRef.current.files[0];
      const maxSizeInBytes = 700 * 1024;

      if (imageFile.size <= maxSizeInBytes) {
        formData.append("image", imageFile);
      } else {
        toast.error("Image size should be less than 700KB.");
        setLoading(false);
        return;
      }
    }

    try {
      await editPost(id, formData, token);
      toast.success(`Post edited successfully`);
      onCloseModal();
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={openModal}
      size="md"
      popup
      initialFocus={titleInputRef}
      onClose={onCloseModal}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6">
          <h3 className="text-3xl font-medium text-gray-900 dark:text-white">
            {`Edit Post`}
          </h3>
          <form className="space-y-6" onSubmit={handleEdit}>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Title" />
              </div>
              <TextInput
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ref={titleInputRef}
                placeholder="Title"
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="body" value="Body" />
              </div>
              <TextInput
                id="body"
                name="body"
                placeholder="Body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Upload Post Image" />
              </div>
              <FileInput id="file-upload" name="image" ref={imageRef} />
            </div>
            <div className="mt-2 block">
              <Button type="submit" disabled={loading}>
                {loading ? "Editing..." : "Edit Post"}
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
