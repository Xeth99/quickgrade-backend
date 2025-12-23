import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from "uuid";
import Exam from "./examModel";
import StudentResponse from "./studentResponseModel";
import Student from "./studentModel";
class Grading extends Model {
  static associate() {
    Grading.belongsTo(Exam, { foreignKey: "examId", as: "exam" });
    Grading.belongsTo(StudentResponse, {
      foreignKey: "responseId",
      as: "studentResponse",
    });
    Grading.belongsTo(Student, { foreignKey: "studentId", as: "student" });
  }
}

Grading.init(
  {
    gradingId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    responseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    examId: {
      type: DataTypes.UUID,
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    objectiveGrade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fillInTheGapGrade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    theoryGrade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalGrade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lastUpdatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Grading",
  }
);

export default Grading;
