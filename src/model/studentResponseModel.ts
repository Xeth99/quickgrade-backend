import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from "uuid";
import Grading from "./gradingModel";
import Student from "./studentModel";
import Exam from "./examModel";
import Question from "./questionModel";

class StudentResponse extends Model {
  static associate() {
    StudentResponse.hasMany(Grading, {
      foreignKey: "responseId",
      as: "gradings",
    });
    StudentResponse.belongsTo(Student, {
      foreignKey: "studentId",
      as: "student",
    });
    StudentResponse.belongsTo(Exam, {
      foreignKey: "examId",
      as: "exam",
    });
    StudentResponse.belongsTo(Question, {
      foreignKey: "questionId",
      as: "question",
    });
  }
}

StudentResponse.init(
  {
    responseId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    questionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    responseText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isCorrect: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "StudentResponse",
  }
);

export default StudentResponse;
