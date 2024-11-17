"use client";

import React, { useContext } from "react";
import ThemeSwitch from "../common/ThemeSwitch";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import SignIn from "@/app/(auth)/signIn/page";
import SignUp from "@/app/(auth)/signUp/page";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { noAvatar } from "@/assets";
import AuthContext from "@/context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    if (token) localStorage.removeItem("token");
    router.refresh();
  };

  return (
    <div className="sticky top-0 z-10 bg-background shadow-md shadow-shadow">
      <div className="container max-w-screen-lg h-[70px] p-3 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6">
          <Link href="/" className="text-2xl font-bold">
            Nestly
          </Link>
        </div>

        {/* User Session */}
        <div className="flex items-center gap-3 md:gap-5">
          {token ? (
            <>
              <div className="w-[32px] h-[32px] rounded-full overflow-hidden border-[3px] border-border grid place-content-center">
                <Dropdown
                  label={
                    <Image
                      alt="User settings"
                      src={user?.profile_image || noAvatar}
                      width={32}
                      height={32}
                      className="w-[32px] h-[32px] rounded-full"
                    />
                  }
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {user ? user.name : ""}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user ? user.email : ""}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item>Profile</Dropdown.Item>
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
    </div>
  );
};

export default Header;
