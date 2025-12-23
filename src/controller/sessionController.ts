import { type Request, type Response } from "express";
import Session from "../model/sessionModel";

export const createSession = async (req: Request, res: Response) => {
  try {
    const { startYear, endYear, sessionLabel } = req.body;
    if (!startYear || !endYear || !sessionLabel) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const session = await Session.create({
      startYear,
      endYear,
      sessionLabel,
    });
    res.status(201).json(session);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create session" });
  }
};
