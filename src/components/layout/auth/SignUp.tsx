"use client";

import { Register } from "@/lib/actions";
import {
  Button,
  Checkbox,
  FileInput,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (imageRef.current?.files?.[0]) {
      const imageFile = imageRef.current.files[0];
      const maxSizeInBytes = 700 * 1024;

      if (imageFile.size <= maxSizeInBytes) {
        formData.append("image", imageFile);
      } else {
        toast.error("Image size should be less than 700KB.");
      }
    }

    try {
      await Register(formData);
      toast.success(`Registered successfully`);
      onCloseModal();
    } catch (error) {
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        size="sm"
        color="dark"
        className="p-0"
        onClick={() => setOpenModal(true)}
      >
        Register
      </Button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-medium text-gray-900 dark:text-white">
              Sign Up
            </h3>
            <form className="space-y-6" onSubmit={handleRegister}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="username" value="Your Username" />
                </div>
                <TextInput
                  id="username"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your Name" />
                </div>
                <TextInput id="name" name="name" placeholder="Name" required />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your Password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your Email" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="file-upload" value="Upload Image" />
                </div>
                <FileInput id="file-upload" ref={imageRef} />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms">
                    I agree to the terms and conditions
                  </Label>
                </div>
              </div>
              <div className="w-full">
                <Button type="submit">
                  {loading ? (
                    <>
                      <Spinner
                        aria-label="Loading spinner"
                        size="md"
                        color="white"
                      />
                      <span className="ml-2">Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </form>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Sign In
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
