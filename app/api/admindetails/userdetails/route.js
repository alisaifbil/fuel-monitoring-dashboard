import { connectToDB } from "@/utils/database";
import User from "@/models/user";

//GET
export const GET = async (request) => {
  try {
    await connectToDB();
    const userList = await User.find();

    if (!userList) return new Response("User not found", { status: 404 });
    return new Response(JSON.stringify(userList), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch any User", { status: 500 });
  }
};
