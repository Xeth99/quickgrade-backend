import { type Request, type Response } from 'express'
import Grading from '../model/gradingModel'

const gradingCriteria = {
  A: { min: 70, max: 100 },
  B: { min: 60, max: 69 },
  C: { min: 50, max: 59 },
  D: { min: 40, max: 49 },
  F: { min: 0, max: 39 }
}

function calculateGrade (gradeValue: number): string {
  for (const [grade, range] of Object.entries(gradingCriteria)) {
    if (gradeValue >= range.min && gradeValue <= range.max) {
      return grade
    }
  }
  return 'Invalid'
}

export const grades = async (req: Request, res: Response): Promise<void> => {
  try {
    const { gradingId, studentId, responseId, examId, courseCode, semester, department, objectiveGrade, fillInTheGapGrade, theoryGrade, lastUpdatedBy, totalGrade } = req.body

    if (!studentId || !responseId || !courseCode || !semester || !department || totalGrade === undefined) {
      res.status(400).json({ message: 'Invalid input data' })
      return
    }

    const studentGrade = calculateGrade(totalGrade)

    const gradeData = await Grading.create({
      gradingId,
      studentId,
      responseId,
      examId,
      courseCode,
      semester,
      objectiveGrade,
      fillInTheGapGrade,
      theoryGrade,
      department,
      lastUpdatedBy,
      grade: studentGrade
    })
    res.status(200).json(gradeData)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
