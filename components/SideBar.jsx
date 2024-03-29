"use client";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import useSidebarControls from "@/hooks/sidebar-control";
import NavBar from "./NavBar";

const SideBar = ({ children }) => {
  const { open, close, show } = useSidebarControls();
  const [active, setActive] = useState("");
  const [providers, setProviders] = useState(null);
  const [Menus, setMenus] = useState([]);
  const [Pages, setPages] = useState([]);
  const { data: session, status } = useSession();
  const pathName = usePathname();

  // const Pages = [
  //   { title: "Dashboard", role: "all_users" },
  //   { title: "Entry", role: "makers" },
  //   { title: "Settings", role: "admins" },
  // ];

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    const getAllPages = async () => {
      const response = await fetch(`/api/admindetails/lovdetails/sideBarMenu`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();
      // console.log(data[0].values);
      setPages(data[0].values);
    };

    setUpProviders();
    getAllPages();
    setMenus();
  }, []);

  useEffect(() => {
    const currentPathName =
      pathName.split("/")[1].charAt(0).toUpperCase() +
      pathName.split("/")[1].slice(1);
    setActive(currentPathName);
  }, [pathName]);

  useEffect(() => {
    setUpMenu();
  }, [session, Pages]);

  const handleNavBarBtnClick = (title) => {
    setActive(title);
  };

  const setUpMenu = async () => {
    const menuArray =
      session && status === "authenticated"
        ? Pages.filter(
            (page) =>
              session?.user.roles.findIndex((user) => user === page.role) !== -1
          )
        : Pages.filter((page) => page.role === "all_users");
    setMenus(menuArray);
  };

  return (
    <div className="flex">
      <div className="hidden md:block">
        <div
          className={`${
            show ? "w-72" : "w-20"
          } p-5 pt-8 duration-300 min-h-screen h-full bg-dark-purple relative z-20`}
        >
          <ChevronLeftIcon
            className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 border-dark-purple fill-dark-purple bg-white ${
              !show && "rotate-180"
            }`}
            onClick={show ? close : open}
          />
          <div className="flex gap-x-4 items-center">
            <h1
              className={`text-gray-200 origin-left font-medium text-xl duration-300 text-center ${
                !show && "scale-0"
              }`}
            >
              Vehicle Fuel Management Portal
            </h1>
          </div>
          <ul className="pt-6">
            {Menus?.map((menu, index) => (
              <Link key={index} href={`/${menu.title.toLowerCase()}`}>
                <li
                  key={index}
                  className={`${
                    show && active === menu.title && "bg-light-white"
                  } text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md checked:bg-violet-700`}
                  onClick={() => handleNavBarBtnClick(menu.title)}
                >
                  <Image
                    src={`/assets/${menu.title}.svg`}
                    width={37}
                    height={37}
                    className="fill-white"
                    alt="Menu Title Logo"
                  />
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
      </div>
      <div className="z-10 text-2xl font-semibold flex-1">
        <NavBar
          Menus={Menus}
          activeBtn={active}
          setActiveBtn={setActive}
          providers={providers}
          session={session}
          signIn={signIn}
          signOut={signOut}
        />
        {children}
      </div>
    </div>
  );
};

export default SideBar;
