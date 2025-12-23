import { type Request, type Response } from "express";
import Exam from "../model/examModel";
import Question from "../model/questionModel";

export const createQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { examId, lecturerId, questions } = req.body;
    if (!examId || !lecturerId || !questions) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const exam = await Exam.findByPk(examId);
    if (!exam) {
      res.status(400).json({ message: "Exam not found" });
      return;
    }

    const formattedQuestions = questions.map((q: any) => ({
      examId,
      examSectionId: q.examSectionId,
      lecturerId,
      questionText: q.questionText,
      optionA: q.optionA ?? null,
      optionB: q.optionB ?? null,
      optionC: q.optionC ?? null,
      optionD: q.optionD ?? null,
      correctAnswer:
        q.questionType === "Objective" ||
        q.questionType === "FillInTheGap" ||
        q.questionType === "Theory"
          ? q.correctAnswer
          : null,
      questiomType: q.questionType,
      courseCode: q.courseCode,
    }));
    const createdQuestions = await Question.bulkCreate(formattedQuestions);
    res.status(201).json({
      message: "Questions created successfully",
      count: createdQuestions.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create questions" });
  }
};

