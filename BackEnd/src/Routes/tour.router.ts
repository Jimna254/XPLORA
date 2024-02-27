import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  createTour,
  deleteTour,
  getOneTour,
  getTours,
  updateTour,
} from "../Controllers/toursController";

const tourRouter = Router();

tourRouter.post("/", createTour);
tourRouter.get("/", verifyToken, getTours);
tourRouter.get("/:id", verifyToken, getOneTour);
tourRouter.put("/update/:id", verifyToken, updateTour);
tourRouter.delete("/delete/:id", verifyToken, deleteTour);

export default tourRouter;
