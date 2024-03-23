import User from "../Schemas/UserModeel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import jwt from "jsonwebtoken";

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
    return next(errorHandler(400, "Please fill all fields"));
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

export const signinConroller = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "Please fill all fields"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }
    const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({ rest });
  } catch (error) {
    next(error);
  }
};

// import User from "../Schemas/UserModel.js";
// import bcryptjs from "bcryptjs";
// import { errorHandler } from "../Utils/error.js";
// import jwt from "jsonwebtoken";

// export const authController = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password || email === "" || password === "") {
//     return next(errorHandler(400, "Please fill all fields"));
//   }

//   const hashedPassword = await bcryptjs.hash(password, 10);

//   const newUser = new User({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser.save();
//     return res.status(201).json({ message: "User Created" });
//   } catch (error) {
//     next(error);
//   }
// };

// export const signinController = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(errorHandler(400, "Please fill all fields"));
//   }

//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       return next(errorHandler(404, "User not found"));
//     }
//     const validPassword = await bcryptjs.compare(password, validUser.password);
//     if (!validPassword) {
//       return next(errorHandler(400, "Invalid password"));
//     }
//     const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
//     return res
//       .status(200)
//       .cookie("access_token", token, { httpOnly: true })
//       .json({ validUser });
//   } catch (error) {
//     next(error);
//   }
// };
