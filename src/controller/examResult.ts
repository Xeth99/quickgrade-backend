import { type Request, type Response } from 'express'
import Grading from '../model/gradingModel'
import Courses from '../model/courseModel'
import Student from '../model/studentModel'
import Exam from '../model/examModel'

Grading.belongsTo(Student, { foreignKey: 'studentId' }) 
Grading.belongsTo(Courses, { foreignKey: 'courseId' })
Grading.belongsTo(Exam, { foreignKey: 'examId' })

export const getExamResults = async (req: Request, res: Response): Promise<any> => {
  try {
    const { courseCode, session, semester } = req.params
    if (!courseCode || !session || !semester) {
      return res.status(400).json({
       message: "Course code, Session, and Semester are required"
     })
    } 
      const examResults = await Grading.findAll({
        include: [
          {
            model: Courses,
            attributes: ['courseCode', 'courseTitle'],
            where: {
              courseCode
            }
          },
          {
            model: Student,
            attributes: ['studentId', 'department', 'faculty', 'level']
          },
          {
            model: Exam,
            attributes: ['totalScore'],
            where: {
              session,
              semester
            }
          }
        ]
      })
     return res.status(200).json(examResults)
  } catch (error) {
    res.status(500).json({ error })
  }
}
