import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  createcategory,
  deleteCategory,
  getCategories,
  getOneCategory,
  updatecategory,
} from "../Controllers/categoryController";

const categoryRouter = Router();

categoryRouter.post("/", createcategory);
categoryRouter.get("/", verifyToken, getCategories);
categoryRouter.get("/:id", verifyToken, getOneCategory);
categoryRouter.put("/update/:id", verifyToken, updatecategory);
categoryRouter.delete("/delete/:id", verifyToken, deleteCategory);

export default categoryRouter;
