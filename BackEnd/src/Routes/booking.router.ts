import { Router } from "express";

import { verifyToken } from "../Middlewares/verifyToken";
import {
  cancelBooking,
  createBooking,
  deleteBooking,
  getBookings,
  getOneBooking,
  getUserBookings,
  updateBooking,
} from "../Controllers/bookingsController";

const bookingRouter = Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", verifyToken, getBookings);
bookingRouter.get("/:id", verifyToken, getOneBooking);
bookingRouter.get("/userbookings/:user_id", verifyToken, getUserBookings);
bookingRouter.put("/update/:id", verifyToken, updateBooking);
bookingRouter.put("/cancel/:id", verifyToken, cancelBooking);
bookingRouter.delete("/delete/:id", verifyToken, deleteBooking);

export default bookingRouter;
