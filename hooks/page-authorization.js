import { useSession } from "next-auth/react";

export const pageAuthorization = (page) => {
  const { data: session } = useSession();

  const confirmAuthorization = async () => {
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
    console.log(menuBtnList, "--", page.split("/")[1]);
    const autho = menuBtnList.findIndex(
      (menu) => menu.title.toLowerCase() === page.split("/")[1].toLowerCase()
    );
    console.log(autho);
    if (
      menuBtnList.findIndex(
        (menu) => menu.title.toLowerCase() === page.split("/")[1].toLowerCase()
      ) !== -1
    )
      return true;

    return false;
  };
  const isAuthorized = confirmAuthorization();
  return isAuthorized;
};

export default pageAuthorization;
