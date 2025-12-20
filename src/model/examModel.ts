import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import { v4 as uuidv4 } from 'uuid'
import Lecturer from './lecturerModel'
class Exam extends Model {
  static associate (models: any): void {
    Exam.belongsTo(models.Courses, {
      foreignKey: 'courseCode',
      as: 'course'
    })
    Exam.belongsTo(models.Lecturer, {
      foreignKey: 'lecturerId',
      as: 'lecturer'
    })
    Exam.belongsTo(models.Department, {
      foreignKey: 'departmentId', as: 'department'
    })
    Exam.belongsTo(models.Session, {
      foreignKey: 'sessionId', as: 'session'
    })
    Exam.belongsTo(models.Semester, {
      foreignKey: 'semesterId', as: 'semester'
    })
    Exam.hasOne(models.ExaminationTimetable, {
      foreignKey: 'examId',
      as: 'examinationTimetable'
    })
  }
}

Exam.init(
  {
    examId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    lecturerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false
    }, 
    semesterId: {
      type: DataTypes.UUID,
      allowNull: false
    }, 
    examDuration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    examInstruction: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    // courseCode: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // firstSection: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // secondSection: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // thirdSection: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // courseTitle: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },

    // semester: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // session: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // faculty: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // department: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // examDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalNoOfQuestions: {
      type: DataTypes.INTEGER
    }

  },
  {
    sequelize,
    modelName: 'Exam'
  }
)
export default Exam
