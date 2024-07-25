"use client";

import { FaCartShopping } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../app/favicon.ico";
import useUserStore from "@/store/userStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  const handleLogout = () => {
    clearUser();
    setDropdownOpen(false);
    window.location.reload();
  };

  return (
    <div className="sticky top-0 bg-white shadow-md p-4 grid grid-cols-3 justify-between items-center">
      <div className="flex items-center space-x-4">
        <Link href="/" legacyBehavior>
          <a
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            href="/"
          >
            <div className="flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
              <Image src={Logo} alt="Logo" width={38} height={38} priority />
            </div>
            <div className="ml-2 flex-none text-lg font-bold uppercase md:hidden lg:block">
              Acme Store
            </div>
          </a>
        </Link>
        <Link href="/all" legacyBehavior>
          <a className="text-lg font-semibold text-gray-800">All</a>
        </Link>
        <Link href="/beauty" legacyBehavior>
          <a className="text-lg font-semibold text-gray-800">Beauty</a>
        </Link>
        <Link href="/furniture" legacyBehavior>
          <a className="text-lg font-semibold text-gray-800">Furniture</a>
        </Link>
      </div>
      <div className="flex-grow mx-4">
        <div className="relative w-full max-w-2xl mx-auto">
          <input
            type="text"
            placeholder="Search product..."
            className="border border-gray-500 rounded-full py-1 px-3 w-full"
          />
          <IoSearchSharp className="absolute right-3 top-[10px] text-blue-500" />
        </div>
      </div>
      <div className="flex items-center gap-5 justify-end">
        <div className="border-r border-gray-500 pr-5">
          <FaCartShopping className="text-2xl text-gray-800 cursor-pointer" />
        </div>
        {user ? (
          <div className="relative">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <span className="text-gray-800">{`${user.firstName} ${user.lastName}`}</span>
              <Image
                src={user.image}
                alt=""
                width={30}
                height={30}
                className="rounded-full border border-gray-500"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/auth/login" legacyBehavior>
            <a className="text-lg font-semibold bg-blue-500 text-white py-1 px-4 rounded">
              Sign in
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
