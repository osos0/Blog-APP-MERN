import express from "express";
import { test } from "../Controller/User-Conroller.js";
const router = express.Router();

router.get("/test", test);

export default router;
