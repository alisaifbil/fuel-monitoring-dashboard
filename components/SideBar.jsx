"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";

const SideBar = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("");
  

  const Menus = [{ title: "Dashboard" }, { title: "Entry" }];

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } p-5 pt-8 duration-300 h-screen bg-dark-purple relative`}
      >
        <ChevronLeftIcon
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple fill-dark-purple bg-white ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen((prev) => !prev)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/next.svg"
            className={`cursor-pointer duration-500 w-16 h-16 `}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            Description
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <Link key={index} href={`/${menu.title.toLowerCase()}`}>
              <li
                key={index}
                className={`${
                  open && active === menu.title && "bg-light-white"
                } text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md checked:bg-violet-700`}
                onClick={() => setActive(menu.title)}
              >
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="p-7 text-2xl font-semibold flex-1 h-screen">
        {children}
      </div>
    </div>
  );
};

export default SideBar;
