import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from "uuid";
import Exam from "./examModel";
import Lecturer from "./lecturerModel";
import Courses from "./courseModel";
import ExamSection from "./examSectionModel";
class Question extends Model {
  declare questionId: string;
  declare examSectionId: string;
  declare examId: string;
  declare lecturerId: string;
  declare questionText: string;
  declare questionType: "Objective" | "Theory" | "FillInTheGap";
  declare optionA?: string;
  declare optionB?: string;
  declare optionC?: string;
  declare optionD?: string;
  declare correctAnswer: string;
  declare courseCode: string;
  static associate(models: any): void {
    Question.belongsTo(Exam, {
      foreignKey: "examId",
      as: "exam",
    });
    Question.belongsTo(Lecturer, {
      foreignKey: "lecturerId",
      as: "lecturer",
    });
    Question.belongsTo(Courses, {
      foreignKey: "courseCode",
      as: "course",
    });
    Question.belongsTo(ExamSection, {
      foreignKey: "examSectionId",
      as: "examSection",
    });
  }
}
Question.init(
  {
    questionId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    examSectionId: {
      type: DataTypes.UUID,
    },
    examId: {
      type: DataTypes.UUID,
    },
    lecturerId: {
      type: DataTypes.UUID,
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    optionA: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    optionB: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    optionC: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    optionD: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correctAnswer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    questionType: {
      type: DataTypes.ENUM("Objective", "Theory", "FillInTheGap"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Question",
  }
);

export default Question;
