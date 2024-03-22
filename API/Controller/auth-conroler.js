import User from "../Schemas/UserModeel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";

export const authConroller = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "Please fill all fields"));
    // return res.status(400).json({ message: "Please fill all fields" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(201).json({ message: "User Created" });
  } catch (error) {
    next(error);
  }
};
