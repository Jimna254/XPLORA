import { Router } from "express";
import {
  loginUser,
  resetPassword,
  checkdetails,
} from "../Controllers/authController";
import { verifyToken } from "../Middlewares/verifyToken";

const auth_Router = Router();
auth_Router.post("/checkdetails", verifyToken, checkdetails);
auth_Router.post("/login", loginUser);
auth_Router.put("/reset", resetPassword);

export default auth_Router;
