import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import Exam from "../model/examModel";
import Question from "../model/questionModel";
import { v4 as uuidv4 } from "uuid";

class ExamSection extends Model {
  declare examSectionId: string;
  declare examId: string;
  declare questionId: string;
  declare sectionLabel: string;
  declare questionType: "Objective" | "Theory" | "FillInTheGap";
  declare scoreObtainable: number;
  declare numberOfQuestions: number;

  static associate(models: any): void {
    ExamSection.belongsTo(Exam, {
      foreignKey: "examId",
      as: "exam",
    });
    ExamSection.hasMany(Question, {
      foreignKey: "examSectionId",
      as: "questions",
    });
  }
}

ExamSection.init(
  {
    examSectionId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: () => uuidv4(),
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sectionLabel: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    questionType: {
      type: DataTypes.ENUM("Objective", "Theory", "FillInTheGap"),
      allowNull: false,
    },
    scoreObtainable: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberOfQuestions: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ExamSection",
  }
);

export default ExamSection;
