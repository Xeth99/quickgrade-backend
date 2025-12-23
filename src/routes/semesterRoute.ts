import express from "express";
import { createSemester } from "../controller/semesterController";

const router = express.Router();

router.post("/", createSemester);

export default router;
