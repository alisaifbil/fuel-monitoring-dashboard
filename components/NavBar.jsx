import React from "react";

import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="flex-between w-full mb-16 top-0 pt-3 justify-center h-[3.25rem] border-b border-gray-300 bg-gradient-to-b from-zinc-200 backdrop-blur-2xl">
      <div className="float-right pr-16 pt-3">
        <Image
          src={"/next.svg"}
          width={37}
          height={37}
          className="rounded-lg object-contain"
          alt="profile"
        />
      </div>
    </nav>
  );
};

export default NavBar;
