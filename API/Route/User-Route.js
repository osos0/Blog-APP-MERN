import express from "express";
import { test, updateUser } from "../Controller/User-Conroller.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userid", verifyToken, updateUser);

export default router;
