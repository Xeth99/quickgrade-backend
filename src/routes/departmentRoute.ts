import express from "express";
import {
  createDepartment,
  getDepartments,
} from "../controller/departmentController";

const router = express.Router();

router.post("/", createDepartment);
router.get("/", getDepartments);

export default router;
