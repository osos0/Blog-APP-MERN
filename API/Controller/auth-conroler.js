import User from "../Schemas/UserModeel.js";
import bcryptjs from "bcryptjs";

export const authConroller = async (req, res) => {
  const { username, email, password } = req.body;

  if (
    (!username && !email && !password,
    username === "",
    email === "",
    password === "")
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
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
    return res.status(500).json({ message: error.message });
  }
};
