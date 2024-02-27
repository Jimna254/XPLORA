import { Request, Response } from "express";
import { v4 } from "uuid";
import mssql from "mssql";
import { sqlConfig } from "../Config/sql.config";
import Connection from "../DBHelper/dbhelper";
import { Category } from "../Interfaces/categoryInterface";

const dbhelper = new Connection();

export const createcategory = async (req: Request, res: Response) => {
  try {
    let id = v4();
    console.log("Category:", id);
    const { name, description }: Category = req.body;

    console.log(req.body);

    const pool = await mssql.connect(sqlConfig);
    // checking  if category allready  exists in the database by its name
    const result = (
      await pool
        .request()
        .input("name", mssql.VarChar, name)
        .execute("CheckCategoryExists")
    ).recordset;

    console.log("Your result", result.length);

    if (result.length >= 1) {
      return res.status(503).json({ message: "This category already exists" });
    } else {
      const createresult = (
        await pool
          .request()
          .input("category_id", mssql.VarChar, id)
          .input("name", mssql.VarChar, name)
          .input("description", mssql.VarChar, description)
          .execute("createCategory")
      ).rowsAffected;

      console.log(createresult);
      return res.status(201).json({
        message: `${name} Category created succesfully.`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500).json({ message: err });
  }
};

//get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    let Categories = (await dbhelper.execute("getCategories")).recordset;
    if (Categories) {
      return res.json({ Categories });
    } else {
      return res.status(200).json({
        message: "No Categories Found",
      });
    }
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving Categories" });
  }
};

//get one Category
export const getOneCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Category:", id);
    let category = (
      await dbhelper.execute("getOneCategory", {
        category_id: id,
      })
    ).recordset;
    console.log(category);
    return res.json({ category });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving category" });
  }
};

export const updatecategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { name, description }: Category = req.body;
    console.log(req.body);

    console.log("Category ID:", id);
    let result = await dbhelper.execute("updateCategory", {
      category_id: id,
      name,
      description,
    });
    return res.json({ result, message: "Category updated successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue updatingCategory" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Cat ID Del:", id);
    let category = await dbhelper.execute("deleteCategory", {
      category_id: id,
    });

    return res.json({ category });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting Category" });
  }
};
