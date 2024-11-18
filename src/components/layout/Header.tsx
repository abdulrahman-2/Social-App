"use client";

import ThemeSwitch from "../common/ThemeSwitch";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { noAvatar } from "@/assets";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import { useDispatch, useSelector } from "react-redux";
import { deleteTokenAndUser } from "@/redux/slices/authSlice";
import { User } from "@/types/types";
import { isValidImageUrl } from "@/lib/utils";
import toast from "react-hot-toast";

const Header = () => {
  const { isAuthenticated, user } = useSelector(
    (state: { auth: { isAuthenticated: boolean; user: User } }) => state.auth
  );
  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = async () => {
    dispatch(deleteTokenAndUser());
    toast.success("Logout successful!");
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-10 bg-background shadow-lg rounded-b-lg shadow-shadow h-[70px] p-3 flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/" className="text-2xl font-bold">
          Nestly
        </Link>
      </div>

      {/* User Session */}
      <div className="flex items-center gap-2 md:gap-3">
        {isAuthenticated ? (
          <>
            <div className="w-[35px] h-[35px] rounded-full overflow-hidden border-[3px] border-border grid place-content-center">
              <Dropdown
                label={
                  <Image
                    alt="User settings"
                    src={
                      isValidImageUrl(user?.profile_image)
                        ? (user?.profile_image as string)
                        : noAvatar
                    }
                    width={35}
                    height={35}
                    priority
                    className="w-[35px] h-[35px] rounded-full"
                  />
                }
                arrowIcon={false}
                inline
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user?.name || "Guest"}</span>
                  <span className="block truncate text-sm font-medium">
                    {user?.email || "No email available"}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>
                  <Link href={`/profile/${user?.id}`}>Profile</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 md:gap-3">
            <SignIn />
            <SignUp />
          </div>
        )}

        {/* Theme Switch */}
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
