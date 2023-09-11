"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import FormInput from "@/libraries/ui-design-system/src/design-system/input/page";
import FormLabel from "@/libraries/ui-design-system/src/design-system/form-label/page";
import pageAuthorization from "@/hooks/page-authorization";

const AdminPage = () => {
  const [lovName, setLovName] = useState("");
  const [lovValue, setLovValue] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [usersList, setUsersList] = useState([]);
  const router = useRouter();
  const pathName = usePathname();
  const isAuhtorized = pageAuthorization(pathName);

  useEffect(() => {
    if (!isAuhtorized) router.push("/dashboard");
    else {
      const getUserList = async () => {
        try {
          const response = await fetch(`/api/admindetails/userdetails`, {
            next: { revalidate: 3600 },
          });

          const data = await response.json();
          setUsersList(data);
        } catch (error) {
          console.log(error);
        }
      };

      getUserList();
    }
  }, []);

  const setLOVValue = async (event) => {
    event.preventDefault();

    if (lovName.trim() !== "" && lovValue.trim() !== "") {
      try {
        const response = await fetch(
          `/api/admindetails/lovdetails/${lovName}`,
          {
            method: "POST",
            body: JSON.stringify({
              name: lovName,
              value: JSON.parse(lovValue),
            }),
          }
        );

        alert(
          response.status === 201 || response.status === 200
            ? "Successfully Inserted"
            : "Failed to update LOV"
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const updateUserRole = async (event) => {
    event.preventDefault();

    if (userEmail.trim() !== "" && userRole.trim() !== "") {
      try {
        const response = await fetch(
          `/api/admindetails/userdetails/${userEmail}`,
          {
            method: "PATCH",
            body: JSON.stringify({
              userEmail: userEmail,
              userRole: userRole,
            }),
          }
        );

        alert(
          response.status === 200
            ? "Successfully Updated"
            : "Failed to update User Role"
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-y-2 h-max p-4 md:flex-row md:justify-around">
      <form className="md:w-[50%] w-full p-2 pt-2 border border-neutral-200 shadow-md">
        <div className="flex justify-center align-center p-4">
          <h3>LOV Management</h3>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <FormLabel label="Name" />
            <FormInput
              type="text"
              id="lovName"
              value={lovName}
              onChange={(event) => setLovName(event.target.value)}
            />
          </div>
          <div>
            <FormLabel label="Value Object" />
            <FormInput
              type="text"
              id="lovValue"
              value={lovValue}
              onChange={(event) => setLovValue(event.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={(e) => setLOVValue(e)}
        >
          Add LOV
        </button>
      </form>
      <form className="md:w-[45%] w-full p-2 pt-2 border border-neutral-200 shadow-md">
        <div className="flex justify-center align-center p-4">
          <h3>User Role Management</h3>
        </div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          <div>
            <FormLabel label="Username" />

            {usersList?.length > 0 ? (
              <select
                id="users"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(event) => setUserEmail(event.target.value)}
                required
              >
                {usersList?.map((user, index) => (
                  <option key={index} value={user.email}>
                    {user.username}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
          <div>
            <FormLabel label="New Role" />
            <FormInput
              type="text"
              id="userRole"
              value={userRole}
              onChange={(event) => setUserRole(event.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="float-right text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={(e) => updateUserRole(e)}
        >
          Add New Role
        </button>
      </form>
    </div>
  );
};

export default AdminPage;
