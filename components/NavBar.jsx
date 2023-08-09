import React from "react";

import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  const Menus = [{ title: "Dashboard" }, { title: "Entry" }];
  return (
    <nav className="w-auto h-[3.25rem] border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl">
      <div className="flex md:float-right py-6 pr-[2.5rem] top-0 justify-between">
        <div className="block md:hidden md:w-auto">
          <ul class="flex p-0 flex-row space-x-4 mt-0 border-0 md:hidden">
            <li>
              <a
                href="#"
                class="bg-transparent text-blue-700 p-0"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0"
              >
                About
              </a>
            </li>
          </ul>
        </div>
        <div>
          <Image
            src={"/next.svg"}
            width={37}
            height={37}
            className="rounded-lg object-contain"
            alt="profile"
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
