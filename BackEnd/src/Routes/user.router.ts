import { Router } from "express";
import {
  createUser,
  deleteUser,
  getOneUser,
  getUsers,
  updateUser,
} from "../Controllers/userController";
import { verifyToken } from "../Middlewares/verifyToken";

const userRouter = Router();

userRouter.post("/", createUser); //crear un usuario nuevo en la BD
userRouter.get("/", verifyToken, getUsers);
userRouter.get("/:id", verifyToken, getOneUser);
userRouter.put("/update/:id", verifyToken, updateUser);
userRouter.delete("/delete/:id", verifyToken, deleteUser);
export default userRouter;
