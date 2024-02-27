import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Tour } from "../Interfaces/tourInterface";

const dbhelper = new Connection();

export const createTour = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Tour_Id:", id);
    const {
      title,
      image,
      description,
      location,
      start_date,
      end_date,
      price,
      category_id,
    }: Tour = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);
    // checking  if category allready  exists in the database by its name
    const result = (
      await pool
        .request()
        .input("title", mssql.VarChar, title)
        .execute("CheckTourExists")
    ).recordset;

    console.log("Your result", result.length);

    if (result.length >= 1) {
      return res.status(503).json({ message: "This Tour already exists" });
    } else {
      const createresult = (
        await pool
          .request()
          .input("tour_id", mssql.VarChar, id)
          .input("title", mssql.VarChar, title)
          .input("image", mssql.VarChar, image)
          .input("description", mssql.VarChar, description)
          .input("location", mssql.VarChar, location)
          .input("start_date", mssql.VarChar, start_date)
          .input("end_date", mssql.VarChar, end_date)
          .input("price", mssql.VarChar, price)
          .input("category_id", mssql.VarChar, category_id)

          .execute("createTour")
      ).rowsAffected;

      console.log(createresult);
      return res.status(201).json({
        message: `${title} Tour created succesfully.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//get all Tours
export const getTours = async (req: Request, res: Response) => {
  try {
    let Tours = (await dbhelper.execute("getTours")).recordset;
    if (Tours) {
      return res.json({ Tours });
    } else {
      return res.status(200).json({
        message: "No Tours Found",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving Tours" });
  }
};

//get one Category
export const getOneTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Tour:", id);
    let tour = (await dbhelper.execute("getOneTour", {
      tour_id: id,
    })).recordset;
    console.log(tour);
    return res.json({ tour });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving category" });
  }
};

export const updateTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const {
      title,
      image,
      description,
      location,
      start_date,
      end_date,
      price,
      category_id,
    }: Tour = req.body;
    console.log("Tours Req body", req.body);

    console.log("Tour ID:", id);
    let result = await dbhelper.execute("updateTour", {
      tour_id: id,
      title,
      image,
      description,
      location,
      start_date,
      end_date,
      price,
      category_id,
    });
    return res.json({ result, message: "Tour updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res.status(400).json({ message: "There was an issue updatingTour" });
  }
};

export const deleteTour = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Tour ID Del:", id);
    let tour = await dbhelper.execute("deleteTour", {
      tour_id: id,
    });

    return res.json({ tour });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting Tour" });
  }
};
