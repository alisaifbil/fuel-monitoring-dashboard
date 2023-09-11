import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export const pageAuthorization = (page) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { data: session } = useSession();
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

      if (
        menuBtnList.findIndex(
          (menu) => menu.title.toLowerCase() === page.toLowerCase()
        ) !== -1
      )
        setIsAuthorized(true);

      setIsAuthorized(false);
    };

    populateMenu();
  }, [session]);

  return isAuthorized;
};

export default pageAuthorization;
