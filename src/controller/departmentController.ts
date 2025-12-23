import { type Request, type Response } from "express";
import Department from "../model/departmentModel";
export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { departmentName, facultyId } = req.body;
    if (!departmentName || !facultyId) {
      res.status(400).json({ message: "All fields are required" });
    }
    const department = await Department.create({
      departmentName,
      facultyId,
    });
    res
      .status(200)
      .json({ message: "Department created successfully", data: department });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await Department.findAll();
    if (departments.length === 0) {
      res.status(404).json({ message: "No department found" });
      return;
    }
    res.status(200).json(departments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
