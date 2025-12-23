import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import Exam from "./examModel";
import Session from "./sessionModel";
import Courses from "./courseModel";
import { v4 as uuidv4 } from "uuid";

enum ExamStatus {
  Pending = "pending",
  Completed = "completed",
  Uncompleted = "uncompleted",
  Ongoing = "ongoing",
  Postponed = "postponed",
  Cancelled = "cancelled",
}

class ExaminationTimetable extends Model {
  static associate() {
    ExaminationTimetable.belongsTo(Exam, {
      foreignKey: "examId",
      as: "exam",
    });
    ExaminationTimetable.belongsTo(Courses, {
      foreignKey: "courseId",
      as: "course",
    });
    ExaminationTimetable.belongsTo(Session, {
      foreignKey: "sessionId",
      as: "session",
    });
  }
}

ExaminationTimetable.init(
  {
    timetableId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    examDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(ExamStatus)),
      allowNull: false,
    },
    examId: {
      type: DataTypes.UUID,
      allowNull: false,
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
    modelName: "ExaminationTimetable",
  }
);

export { ExaminationTimetable, ExamStatus };

// app.get('/api/examination-timetable', async (_, res) => {   const timetable = await ExaminationTimetable.findAll();   res.json(timetable); });
