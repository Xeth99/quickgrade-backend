import { type Request, type Response } from "express";
import Courses from "../model/courseModel";
import Exam from "../model/examModel";
import { ExaminationTimetable } from "../model/examinationTimetableModel";

export const createExamTimetable = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { examId, courseId, sessionId, examDate, status } = req.body;
    if (!examId || !courseId || !sessionId || !examDate || !status) {
      res.status(400).json({ message: "All fields are required" });
    }
    const examTimetable = await ExaminationTimetable.create({
      examId,
      courseId,
      sessionId,
      examDate,
      status,
    });
    res
      .status(200)
      .json({
        message: "Examination Timetable created successfully",
        data: examTimetable,
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
export const getExamTimetable = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { sessionId, semester } = req.params;
    if (!sessionId || !semester) {
      return res
        .status(400)
        .json({ message: "Course code, Session and Semester are required" });
    }
    const examTimetable = await ExaminationTimetable.findAll({
      where: {
        sessionId,
      },
      include: [
        {
          model: Exam,
          as: "exam",
          attributes: [
            "examId",
            "examDuration",
            "examInstruction",
            "semester",
            "examDate",
          ],
          where: {
            semester,
          },
          include: [
            {
              model: Courses,
              attributes: ["courseCode", "courseTitle"],
            },
          ],
        },
      ],
    });
    res.status(200).json(examTimetable);
  } catch (error) {
    res.status(500).json({ error });
  }
};
