import React from "react";
import ThemeSwitch from "../common/ThemeSwitch";
import Link from "next/link";

const Header = () => {
  return (
    <div className="mb-10 p-3 h-[70px] rounded-b-lg shadow-lg shadow-shadow flex items-center justify-between">
      <div className="flex items-center gap-3 md:gap-6">
        <Link href="/" className="text-2xl font-bold">
          Nestly
        </Link>
        <Link
          href="/"
          className="font-medium hover:text-secondary duration-150"
        >
          Home
        </Link>
      </div>
      <div className="flex items-center gap-2 md:gap-3">
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 md:px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Login
        </button>
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 md:px-5 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          register
        </button>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Header;
