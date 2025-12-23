import { type Request, type Response } from "express";
import Semester from "../model/semesterModel";

export const createSemester = async (req: Request, res: Response) => {
  try {
    const { semester, sessionId } = req.body;
    if (!semester || !sessionId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const semesterName = await Semester.create({
      semester,
      sessionId,
    });
    res.status(201).json(semesterName);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create semester" });
  }
};
