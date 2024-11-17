"use client";

import { createPost } from "@/lib/actions";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function AddPostModal() {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const token = localStorage.getItem("token") as string;

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await createPost(formData, token);
      toast.success(`Post created successfully`);
      onCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Create Post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Add Post</Button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-medium text-gray-900 dark:text-white">
              Add New Post
            </h3>
            <form className="space-y-6" onSubmit={handleCreate}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  name="body"
                  ref={emailInputRef}
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload Post Image" />
                </div>
                <FileInput id="file-upload" name="image" />
              </div>
              <div className="mt-2 block">
                <Button type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Post"}
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
