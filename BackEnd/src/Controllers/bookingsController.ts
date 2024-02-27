import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Bookings } from "../Interfaces/bookingInterface";
import { ExtendedUserRequest } from "../Middlewares/verifyToken";
import { string } from "joi";

const dbhelper = new Connection();

export const createBooking = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Booking:", id);
    const { user_id, tour_id }: Bookings = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    // checking  if user has allready booked the tour
    const result = (
      await pool
        .request()
        .input("tour_id", mssql.VarChar, tour_id)
        .input("user_id", mssql.VarChar, user_id)
        .execute("CheckTourBooking")
    ).recordset;

    console.log("Your result", result.length);

    if (result.length > 0) {
      return res
        .status(201)
        .json({ errormessage: "You've already Booked for this tour" });
    } else {
      const createresult = (
        await pool
          .request()
          .input("booking_id", mssql.VarChar, id)
          .input("user_id", mssql.VarChar, user_id)
          .input("tour_id", mssql.VarChar, tour_id)
          .execute("createBooking")
      ).rowsAffected;

      console.log(createresult);
      return res.status(200).json({
        message: "Booking created succesfully.",
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//get all categories
export const getBookings = async (req: Request, res: Response) => {
  try {
    let Bookings = (await dbhelper.execute("getBookings")).recordset;
    if (Bookings) {
      return res.json({ Bookings });
    } else {
      return res.status(200).json({
        message: "No Bookings Found",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving Bookings" });
  }
};

//get one Booking
export const getOneBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Booking:", id);
    let booking = await dbhelper.execute("getOneBooking", {
      booking_id: id,
    });
    console.log(booking);

    return res.json({ booking });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving booking" });
  }
};

export const getUserBookings = async (
  req: ExtendedUserRequest,
  res: Response
) => {
  try {
    const user_id = req.info?.user_id;

    if (!user_id) {
      return res.status(401).json({ message: "Unauthorized: Please Login" });
    }

    const bookings = await dbhelper.execute("getUserBookings", { user_id });

    if (bookings.recordset && bookings.recordset.length > 0) {
      return res.json({ bookings: bookings.recordset });
    } else {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }
  } catch (error) {
    console.error("Error in getting bookings from database", error);
    return res
      .status(500)
      .json({ message: "There was an issue retrieving bookings." });
  }
};

export const updateBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { user_id, tour_id }: Bookings = req.body;
    console.log(req.body);

    console.log("Booking ID:", id);
    let result = await dbhelper.execute("updateBooking", {
      booking_id: id,
      tour_id,
      user_id,
    });
    return res.json({ result, message: "Booking updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue updating Booking" });
  }
};

export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Cat ID Del:", id);
    let booking = await dbhelper.execute("deleteBooking", {
      booking_id: id,
    });

    return res.json({ booking });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting Booking" });
  }
};

export const cancelBooking = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Cat ID Del:", id);
    let booking = await dbhelper.execute("cancelBooking", {
      booking_id: id,
    });

    return res.json({ booking });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue cancelling Booking" });
  }
};
