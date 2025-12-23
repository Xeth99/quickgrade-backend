import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from "uuid";
import Exam from "./examModel";
import Student from "./studentModel";
import Lecturer from "./lecturerModel";

class ExamResult extends Model {
  static associate(models: any): void {
    ExamResult.belongsTo(Exam, {
      foreignKey: "examId",
      as: "exam",
    });
    ExamResult.belongsTo(Student, {
      foreignKey: "studentId",
      as: "student",
    });
    ExamResult.belongsTo(Lecturer, {
      foreignKey: "lecturerId",
      as: "lecturer",
    });
  }
}

ExamResult.init(
  {
    resultId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    lecturerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalMarks: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("PUBLISHED", "UPDATED"),
    },
    lastUpdatedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Lecturers",
        key: "lecturerId",
      },
    },
  },
  {
    sequelize,
    modelName: "ExamResult",
  }
);

export default ExamResult;
