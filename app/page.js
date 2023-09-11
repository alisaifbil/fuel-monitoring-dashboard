"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [menuButtons, setMenuButtons] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const populateMenu = async () => {
      const response = await fetch(`/api/admindetails/lovdetails/sideBarMenu`, {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      const menuBtnList = session?.user.roles
        ? data[0].values.filter(
            (page) =>
              session?.user.roles.findIndex((role) => role === page.role) !== -1
          )
        : [{ title: "Dashboard", role: "all_users" }];

      setMenuButtons(menuBtnList);
    };

    populateMenu();
  }, [session]);

  const redirectTo = async (page) => {
    router.push(`/${page.toLowerCase()}`);
  };

  return (
    <div className="">
      <div className="flex w-full h-96 bg-gradient-to-r from-dark-purple to-blue-300 items-center justify-center gap-x-4">
        {menuButtons?.map((page, index) => (
          <div
            key={index}
            className="flex w-[15%] h-[15%] bg-white/40 rounded-lg items-center justify-center text-slate-800 p-5 cursor-pointer"
            onClick={() => redirectTo(page.title)}
          >
            {page.title}
          </div>
        ))}
      </div>
    </div>
  );
}
