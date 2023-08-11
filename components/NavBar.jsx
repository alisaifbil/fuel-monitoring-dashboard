import React, { useCallback, useMemo, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

const NavBar = ({ Menus, activeBtn, setActiveBtn }) => {
  //   useEffect(() => {
  //     const handleNavBarBtnClick = (title) => {
  //       setActiveBtn(title);
  //     };

  //     return handleNavBarBtnClick();
  //   }, [activeBtn]);

  const handleNavBarBtnClick = useCallback(
    (title) => {
      setActiveBtn(title);
    },
    [activeBtn]
  );

  return (
    <nav className="w-screen h-[3.25rem] border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl md:w-auto">
      <div className="flex py-2 pr-[2.5rem] top-0 justify-between md:float-right md:pt-6">
        <div className="block md:hidden md:w-auto">
          <ul className="flex p-0 flex-row space-x-4 mt-0 border-0 md:hidden">
            {console.log(activeBtn)}
            {Menus.map((menu, index) => (
              <Link key={index} href={`/${menu.title.toLowerCase()}`}>
                <li
                  key={index}
                  className={`${
                    activeBtn === menu.title && "bg-black"
                  } text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md`}
                  onClick={() => {
                    handleNavBarBtnClick(menu.title);
                  }}
                >
                  <span className={`origin-left duration-200`}>
                    {menu.title}
                  </span>
                </li>
              </Link>
            ))}

            {/* <li>
              <Link
                href="#"
                className="bg-transparent text-blue-700 p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:bg-gray-100 hover:bg-transparent border-0 hover:text-blue-700 p-0"
              >
                About
              </Link>
            </li> */}
          </ul>
        </div>
        <div className="flex align-middle">
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
