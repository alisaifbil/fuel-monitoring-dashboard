import { connectToDB } from "@/utils/database";
import User from "@/models/user";

//PATCH
export const PATCH = async (request, { params }) => {
  const { userEmail, userRole } = await request.json();

  try {
    await connectToDB();
    const existingUser = await User.find({ email: userEmail });
    if (existingUser.length < 1)
      return new Response("User not found", { status: 404 });

    let newRole = existingUser[0].roles;
    newRole.push(userRole);

    await User.findOneAndUpdate(
      { email: userEmail },
      { roles: newRole },
      { upsert: true }
    );

    return new Response(JSON.stringify(existingUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the user roles", { status: 500 });
  }
};
