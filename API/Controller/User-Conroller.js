// import User from "../Schemas/UserModeel.js";
// import bcryptjs from "bcryptjs";
// import { errorHandler } from "../Utils/error.js";
// // import jwt from "jsonwebtoken";

// export const test = (req, res) => {
//   res.send("test");
// };

// export const updateUser = async (req, res, next) => {
//   // console.log(req.user);

//   // console.log(req.body);
//   if (req.user.id !== req.params.id) {
//     return next(errorHandler(403, "You are not allowed update this user!"));
//   }

//   if (req.body.password) {
//     if (req.body.password.lenght < 3) {
//       return next(
//         errorHandler(400, "Password must be at least 3 characters long ")
//       );
//     }
//     req.body.password = bcryptjs.hashSync(req.body.password, 10);
//   }
//   if (req.body.username) {
//     if (req.body.username.length < 7 || req.body.username.length > 20) {
//       return next(
//         errorHandler(400, "Username must be between 7 and 20 characters")
//       );
//     }
//     if (req.body.username.includes(" ")) {
//       return next(errorHandler(400, "Username cannot contain spaces"));
//     }
//     if (req.body.username !== req.body.username.toLowerCase()) {
//       return next(errorHandler(400, "Username must be lowercase"));
//     }
//     if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
//       return next(
//         errorHandler(400, "Username can only contain letters and numbers")
//       );
//     }
//   }

//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const userUpdated = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           password: req.body.password,
//           profilePicture: req.body.profilePicture,
//         },
//       },
//       { new: true }
//     );
//     const { password, ...rest } = userUpdated._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

///////////////////////////////////////////////////////////////////////////////

import User from "../Schemas/UserModeel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
// import jwt from "jsonwebtoken";

export const test = (req, res) => {
  res.send("test");
};

export const updateUser = async (req, res, next) => {
  // console.log(req.user);

  // console.log(req.body);
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You are not allowed update this user!"));
  }

  if (req.body.password) {
    if (req.body.password.length < 3) {
      return next(
        errorHandler(400, "Password must be at least 3 characters long ")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Username must be between 7 and 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const userUpdated = await User.findByIdAndUpdate(
      req.params.userid,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    const { password, ...rest } = userUpdated._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
