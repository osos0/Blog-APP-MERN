import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

//////////////////////////////////////////////////////

// import jwt from "jsonwebtoken";

// export const verifyToken = async (req, res, next) => {
//   try {
//     const token = req.cookies.access_token;
//     if (!token) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     // Verify token asynchronously
//     const user = await jwt.verify(token, process.env.JWT_SECRET);

//     // Attach user information to request object
//     req.user = user;
//     next();
//   } catch (err) {
//     console.error("Token verification failed:", err);
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };
