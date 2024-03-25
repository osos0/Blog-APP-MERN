import expree from "express";
import {
  authConroller,
  google,
  signinConroller,
} from "../Controller/auth-conroler.js";
const route = expree.Router();

route.post("/signup", authConroller);
route.post("/signin", signinConroller);
route.post("/google", google);

export default route;
