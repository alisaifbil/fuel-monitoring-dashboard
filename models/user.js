import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email Already Exists"],
    required: [true, "Email Is Required!"],
  },
  username: {
    type: String,
    required: [true, "Username Is Required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
  roles: {
    type: Array,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
