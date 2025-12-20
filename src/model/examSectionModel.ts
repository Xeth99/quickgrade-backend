import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import Courses from '../model/courseModel'
import Session from '../model/sessionModel'
import { v4 as uuidv4 } from 'uuid'

class ExamSection extends Model {
    static associate(models: any): void{
        ExamSection.belongsTo(models.Exam, {
            foreignKey: 'examId', as: 'exam'
        })
    }
}

ExamSection.init(
    {
        examSectionId: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        examId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        sectionLabel: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        questionType: {
            type: DataTypes.ENUM('Multiple Choice', 'Theory', 'Fill in the Gap'),
            allowNull: false
        },
        scoreObtainable: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
numberOfQuestions: {
    type: DataTypes.INTEGER,
    allowNull: false
}
    },
    {
        sequelize, modelName: 'ExamSection'
    }
)