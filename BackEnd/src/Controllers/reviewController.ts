import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Review } from "../Interfaces/reviewsInterface";

const dbhelper = new Connection();

export const createReview = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Review:", id);
    const { booking_id, rating, comment, user_id }: Review = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);

    const createresult = (
      await pool
        .request()
        .input("review_id", mssql.VarChar, id)
        .input("booking_id", mssql.VarChar, booking_id)
        .input("rating", mssql.VarChar, rating)
        .input("comment", mssql.VarChar, comment)
        .input("user_id", mssql.VarChar, user_id)
        .execute("createReview")
    ).rowsAffected;

    console.log(createresult);
    return res.status(201).json({
      message: `Review created succesfully.`,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//get all categories
export const getReviews = async (req: Request, res: Response) => {
  try {
    let Reviews = await dbhelper.execute("getReviews");
    if (Reviews) {
      return res.json({ Reviews });
    } else {
      return res.status(200).json({
        message: "No Reviews Found",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving Reviews" });
  }
};

//get one review
export const getOneReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Review:", id);
    let review = await dbhelper.execute("getOneReview", {
      review_id: id,
    });
    console.log(review);
    return res.json({ review });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving review" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { booking_id, rating, comment, user_id }: Review = req.body;
    console.log(req.body);

    console.log("review ID:", id);
    let result = await dbhelper.execute("updateReview", {
      review_id: id,
      booking_id,
      rating,
      comment,
      user_id,
    });
    return res.json({ result, message: "review updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue updating review" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Review ID Del:", id);
    let review = await dbhelper.execute("deleteReview", {
      review_id: id,
    });

    return res.json({ review });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting review" });
  }
};
