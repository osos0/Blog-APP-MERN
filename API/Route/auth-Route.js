import expree from "express";
import { authConroller } from "../Controller/auth-conroler.js";
const route = expree.Router();

route.post("/signup", authConroller);

export default route;
