"use client";

import { deletePost } from "@/lib/actions";
import { Button, Modal } from "flowbite-react";
import toast from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export function DeleteModal({
  id,
  openModal,
  setOpenModal,
}: {
  id: number;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const token = localStorage.getItem("token") as string;

  const handleDelete = async (id: number) => {
    try {
      await deletePost(id, token);
      toast.success("Post deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post. Please try again.");
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete(id)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
