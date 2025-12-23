import { type Request, type Response } from 'express'
import Courses from '../model/courseModel'
import Student from '../model/studentModel'
import Exam from '../model/examModel'
import { ExaminationTimetable } from '../model/examinationTimetableModel'

export const getExamTimetable = async (req: Request, res: Response): Promise<any> => {
  try {
    const {  sessionId, semester } = req.params
    if ( !sessionId || !semester) {
      return res.status(400).json({ message: 'Course code, Session and Semester are required' })
    }
    const examTimetable = await ExaminationTimetable.findAll({
      where: {
        sessionId,
      },
      include: [
        {
          model: Exam,
          as: 'exam',
          attributes: ['examId', 'examDuration', 'examInstruction', 'semester', 'examDate'],
          where: {
            semester
          },
          include: [
            {
              model: Courses,
              attributes: ['courseCode', 'courseTitle']
            }
          ]

        },
      ]
    })
      res.status(200).json(examTimetable)
    }
  catch (error) {
    res.status(500).json({ error });
  }
}
