import expree from "express";
import { authConroller, signinConroller } from "../Controller/auth-conroler.js";
const route = expree.Router();

route.post("/signup", authConroller);
route.post("/signin", signinConroller);

export default route;
