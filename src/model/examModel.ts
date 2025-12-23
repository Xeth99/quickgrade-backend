import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from "uuid";
import Lecturer from "./lecturerModel";
import Courses from "./courseModel";
import { ExaminationTimetable } from "./examinationTimetableModel";
import ExamSection from "./examSectionModel";
import Department from "./departmentModel";
import Session from "./sessionModel";
import Semester from "./semesterModel";
import Question from "./questionModel";
class Exam extends Model {
  declare questionId: string;
  declare examId: string;
  declare lecturerId: string;
  declare courseId: string;
  declare departmentId: string;
  declare sessionId: string;
  declare semesterId: string;
  declare examDuration: number;
  declare examInstruction: string;
  declare examDate: Date;
  declare totalScore: number;
  declare totalNoOfQuestions: number;

  static associate() {
    Exam.belongsTo(Courses, {
      foreignKey: "courseId",
      as: "course",
    });
    Exam.belongsTo(Lecturer, {
      foreignKey: "lecturerId",
      as: "lecturer",
    });
    Exam.belongsTo(Department, {
      foreignKey: "departmentId",
      as: "department",
    });
    Exam.belongsTo(Session, {
      foreignKey: "sessionId",
      as: "session",
    });
    Exam.belongsTo(Semester, {
      foreignKey: "semesterId",
      as: "semester",
    });
    Exam.hasOne(ExaminationTimetable, {
      foreignKey: "examId",
      as: "examinationTimetable",
    });
    Exam.hasMany(ExamSection, {
      foreignKey: "examId",
      as: "examSection",
    });
    Exam.hasMany(Question, {
      foreignKey: "examId",
      as: "questions",
    });
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
      allowNull: false,
    },
    lecturerId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    semesterId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    examDuration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    examInstruction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    examDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    objectiveScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalScore: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalNoOfQuestions: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Exam",
  }
);
export default Exam;
