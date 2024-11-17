"use client";

import AuthContext from "@/context/AuthContext";
import { login } from "@/lib/actions";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const SignIn = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { saveTokenAndUser } = useContext(AuthContext);

  function onCloseModal() {
    setOpenModal(false);
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const data = await login(formData);
      const token = data.token;
      const user = data.user;
      if (typeof window !== "undefined" && window.localStorage) {
        saveTokenAndUser(user, token);
      }

      toast.success("Login successful!");
      setLoading(false);
      onCloseModal();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to login. Please check your credentials.");
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
        Login
      </Button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-3xl font-medium text-gray-900 dark:text-white">
              Sign In
            </h3>
            <form className="space-y-6" onSubmit={handleLogin}>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your Username" />
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
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
                >
                  Lost Password?
                </a>
              </div>
              <div className="w-full">
                <Button type="submit">
                  {loading ? (
                    <>
                      <Spinner
                        aria-label="Extra large spinner example"
                        size="md"
                        color="white"
                      />
                      <span className="ml-2">Login...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </div>
            </form>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignIn;
