import express from "express";
import {
  createExamTimetable,
  getExamTimetable,
} from "../controller/examinationTimetableController";

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/", createExamTimetable);
router.get("/", getExamTimetable);

export default router;
