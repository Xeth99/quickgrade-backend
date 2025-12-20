import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import Exam from './examModel'
import { v4 as uuidv4 } from 'uuid'

enum ExamStatus { PENDING = 'pending', COMPLETED = 'completed', UNCOMPLETED = 'uncompleted', ONGOING = 'ongoing', POSTPONED = 'postponed', CANCELLED = 'cancelled' }

class ExaminationTimetable extends Model {
  static associate (models: any): void {
    ExaminationTimetable.belongsTo(Exam, {
      foreignKey: 'examId',
      as: 'exam'
    })
    ExaminationTimetable.belongsTo(models.Courses, {
      foreignKey: 'courseId',
      as: 'course'
    })
    ExaminationTimetable.belongsTo(models.Session, {
      foreignKey: 'sessionId',
      as: 'session'
    })
  }
}

ExaminationTimetable.init(
  {
    timetableId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4()
    },
    examDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ExamStatus)),
      allowNull: false
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    courseId: {
      type: DataTypes.UUID,
    },
    sessionId: {
      type: DataTypes.UUID,
    }, 
  },
  {
    sequelize,
    modelName: 'ExaminationTimetable'
  }
)

export { ExaminationTimetable, ExamStatus }

// app.get('/api/examination-timetable', async (_, res) => {   const timetable = await ExaminationTimetable.findAll();   res.json(timetable); });
