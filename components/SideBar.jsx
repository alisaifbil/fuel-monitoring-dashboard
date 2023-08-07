"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ArrowLeftIcon } from "@heroicons/react/24/solid";
import useSidebarControls from "@/hooks/sidebar-control";
import NavBar from "./NavBar";

const SideBar = ({ children }) => {
  const { open, close, show } = useSidebarControls();
  const [active, setActive] = useState("");

  const Menus = [{ title: "Dashboard" }, { title: "Entry" }];

  return (
    <div className="flex">
      <div
        className={`${
          show ? "w-72" : "w-20"
        } p-5 pt-8 duration-300 h-screen bg-dark-purple relative z-20`}
      >
        <ChevronLeftIcon
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple fill-dark-purple bg-white ${
            !show && "rotate-180"
          }`}
          onClick={show ? close : open}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src="/next.svg"
            className={`cursor-pointer duration-500 w-16 h-16 `}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-300 ${
              !show && "scale-0"
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
                  show && active === menu.title && "bg-light-white"
                } text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md checked:bg-violet-700`}
                onClick={() => setActive(menu.title)}
              >
                <span
                  className={`${!show && "hidden"} origin-left duration-200`}
                >
                  {menu.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="z-10 text-2xl font-semibold flex-1 h-screen">
        <NavBar />
        {children}
      </div>
    </div>
  );
};

export default SideBar;
