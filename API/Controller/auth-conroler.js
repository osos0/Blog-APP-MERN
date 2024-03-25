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
      // return res.status(404).json({ message: "User not found" });
    }
    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
      // return res.status(400).json({ message: "Invalid password" });
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

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
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
