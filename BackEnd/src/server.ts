import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import userRouter from "./Routes/user.router";
import auth_Router from "./Routes/auth.router";
import categoryRouter from "./Routes/category.router";
import tourRouter from "./Routes/tour.router";
import bookingRouter from "./Routes/booking.router";
import reviewRouter from "./Routes/review.router";

const app = express();

app.use(cors());
app.use(json());

app.use("/users", userRouter);
app.use("/users", auth_Router);
app.use("/category", categoryRouter);
app.use("/tours", tourRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({ message: error.toString() });
  console.log(error);
});

const port: number | string = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
