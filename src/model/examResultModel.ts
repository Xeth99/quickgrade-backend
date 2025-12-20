import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import { v4 as uuidv4 } from 'uuid'

class ExamResult extends Model {
  static associate(models: any): void{
    ExamResult.belongsTo(models.Exam, {
      foreignKey: 'examId', as: 'exam'
    })
    ExamResult.belongsTo(models.Student, {
      foreignKey: 'studentId', as: 'student'
    })
    ExamResult.belongsTo(models.Lecturer, {
      foreignKey: 'lecturerId', as: 'lecturer'
    })
  }
}

ExamResult.init(
  {
    resultId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    lecturerId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('PUBLISHED', 'UPDATED')
    },
    lastUpdatedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Lecturer',
        key: 'lecturerId'
      }
    }
  },
  {
    sequelize,
    modelName: 'ExamResult'
  }
)

export default ExamResult
