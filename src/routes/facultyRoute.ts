import express from "express";
import { createFaculty, getFaculties } from "../controller/facultyController";

const router = express.Router();

router.post("/", createFaculty);
router.get("/", getFaculties);

export default router;
