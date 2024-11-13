"use client";

import React from "react";
import ThemeSwitch from "../common/ThemeSwitch";
import Link from "next/link";
import { Avatar, Dropdown } from "flowbite-react";
import SignIn from "@/app/(auth)/signIn/page";
import SignUp from "@/app/(auth)/signUp/page";

const Header = () => {
  const session = false;

  return (
    <div className="p-3 h-[70px] rounded-b-lg shadow-lg shadow-shadow flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/" className="text-2xl font-bold">
          Nestly
        </Link>
      </div>

      {/* User Session */}
      <div className="flex items-center gap-3 md:gap-5">
        {session ? (
          <>
            <div className="w-[32px] h-[32px] rounded-full overflow-hidden">
              <Dropdown
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
                arrowIcon={false}
                inline
              >
                <Dropdown.Header>
                  <span className="block text-sm">Bonnie Green</span>
                  <span className="block truncate text-sm font-medium">
                    name@flowbite.com
                  </span>
                </Dropdown.Header>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Sign out</Dropdown.Item>
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
