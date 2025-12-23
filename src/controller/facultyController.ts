import { type Request, type Response } from "express";
import Faculty from "../model/facultyModel";

export const createFaculty = async (req: Request, res: Response) => {
  try {
    const { facultyName } = req.body;
    if (!facultyName) {
      res.status(400).json({ message: "All fields are required" });
    }
    const faculty = await Faculty.create({ facultyName });
    res.status(200).json(faculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFaculties = async (req: Request, res: Response) => {
  try {
    const faculties = await Faculty.findAll();
    if (faculties.length === 0) {
      res.status(404).json({ message: "No faculty found" });
      return;
    }
    res.status(200).json(faculties);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
