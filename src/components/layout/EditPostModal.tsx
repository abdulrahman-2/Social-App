"use client";

import AuthContext from "@/context/AuthContext";
import { editPost, getSinglePost } from "@/lib/actions";
import { Button, FileInput, Label, Modal, TextInput } from "flowbite-react";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { token } = useContext(AuthContext);

  const onCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getSinglePost(id);
        setTitle(data.body || "");
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("body", title);
    if (image) {
      formData.append("image", image);
    }

    try {
      await editPost(id, formData, token);
      toast.success(`Post edited successfully`);
      onCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to Edit Post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
              {`Edit Post's`}
            </h3>
            <form className="space-y-6" onSubmit={handleEdit}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="title" value="Title" />
                </div>
                <TextInput
                  id="title"
                  name="body"
                  ref={emailInputRef}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload Post Image" />
                </div>
                <FileInput
                  id="file-upload"
                  name="image"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
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
    </>
  );
}
