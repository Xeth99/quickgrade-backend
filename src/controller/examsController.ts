import { type Request, type Response } from "express";
import Exam from "../model/examModel";
import ExamSection from "../model/examSectionModel";

export const getLecturerExams = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { lecturerId } = req.query;
  try {
    const exams = await Exam.findAll({ where: { lecturerId } });
    res.json({ exams });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
};

export const getExamById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { examId } = req.params;
  const { lecturerId } = req.query;
  try {
    const exam = await Exam.findOne({
      where: { id: examId, lecturerId },
    });

    if (!exam) {
      res.status(404).json({ message: "Exam not found" });
      return;
    }
    res.json({ exam });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exam" });
  }
};

export const createExamSection = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { examId } = req.params;
  const { sectionLabel, questionType, scoreObtainable, numberOfQuestions } =
    req.body;
  if (
    !sectionLabel ||
    !questionType ||
    !scoreObtainable ||
    !numberOfQuestions
  ) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  try {
    const exam = await ExamSection.create({
      examId,
      sectionLabel,
      questionType,
      scoreObtainable,
      numberOfQuestions,
    });
    res.json({ exam });
  } catch (error) {
    res.status(500).json({ error: "Failed to create exam section" });
  }
};

export const getExamSections = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { examId } = req.params;
    const examSections = await ExamSection.findAll({ where: { examId } });
    res.json({ examSections });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch exam sections" });
  }
};

export const getExamQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { examId } = req.params;
  try {
    const questions = await Exam.findAll({ where: { examId } });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};
