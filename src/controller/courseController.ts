import { type Request, type Response } from "express";
import Courses from "../model/courseModel";
export const createCourse = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const {
      courseCode,
      courseTitle,
      courseUnit,
      sessionId,
      semesterId,
      departmentId,
    } = req.body;
    if (
      !courseCode ||
      !courseTitle ||
      !courseUnit ||
      !sessionId ||
      !semesterId ||
      !departmentId
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const course = await Courses.create({
      courseCode,
      courseTitle,
      creditUnit: courseUnit,
      sessionId,
      semesterId,
      departmentId,
    });
    if (course) {
      res
        .status(200)
        .json({ message: "Course created successfully", data: course });
    } else {
      res.status(400).json({ message: "Failed to create course" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const courses = await Courses.findAll();
    if (courses.length === 0) {
      res.status(404).json({ message: "No course found" });
      return;
    }
    res.json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// export const getCourses = async (
//     req: Request,
//     res: Response
//   ): Promise<void> => {
//     try {
//       const { semester, session } = req.body;

//       const courses = await Courses.findAll({
//         where: {
//           semester,
//           session,
//         },
//       });

//       if (!courses) {
//         res.status(400).json({
//           message: "courses not available",
//         });
//       } else {
//         res.json({
//           message: "Here are the available courses",
//           data: courses,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };
