import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  createReview,
  deleteReview,
  getOneReview,
  getReviews,
  updateReview,
} from "../Controllers/reviewController";

const reviewRouter = Router();

reviewRouter.post("/", createReview);
reviewRouter.get("/", verifyToken, getReviews);
reviewRouter.get("/:id", verifyToken, getOneReview);
reviewRouter.put("/update/:id", verifyToken, updateReview);
reviewRouter.delete("/delete/:id", verifyToken, deleteReview);

// categoryRouter.post("/", createcategory);
// categoryRouter.get("/", verifyToken, getCategories);
// categoryRouter.get("/:id", verifyToken, getOneCategory);
// categoryRouter.put("/update/:id", verifyToken, updatecategory);
// categoryRouter.delete("/delete/:id", verifyToken, deleteCategory);

export default reviewRouter;
