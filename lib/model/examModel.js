"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const lecturerModel_1 = __importDefault(require("./lecturerModel"));
const courseModel_1 = __importDefault(require("./courseModel"));
const examinationTimetableModel_1 = require("./examinationTimetableModel");
const examSectionModel_1 = __importDefault(require("./examSectionModel"));
const departmentModel_1 = __importDefault(require("./departmentModel"));
const sessionModel_1 = __importDefault(require("./sessionModel"));
const semesterModel_1 = __importDefault(require("./semesterModel"));
const questionModel_1 = __importDefault(require("./questionModel"));
class Exam extends sequelize_1.Model {
    static associate() {
        Exam.belongsTo(courseModel_1.default, {
            foreignKey: "courseId",
            as: "course",
        });
        Exam.belongsTo(lecturerModel_1.default, {
            foreignKey: "lecturerId",
            as: "lecturer",
        });
        Exam.belongsTo(departmentModel_1.default, {
            foreignKey: "departmentId",
            as: "department",
        });
        Exam.belongsTo(sessionModel_1.default, {
            foreignKey: "sessionId",
            as: "session",
        });
        Exam.belongsTo(semesterModel_1.default, {
            foreignKey: "semesterId",
            as: "semester",
        });
        Exam.hasOne(examinationTimetableModel_1.ExaminationTimetable, {
            foreignKey: "examId",
            as: "examinationTimetable",
        });
        Exam.hasMany(examSectionModel_1.default, {
            foreignKey: "examId",
            as: "examSection",
        });
        Exam.hasMany(questionModel_1.default, {
            foreignKey: "examId",
            as: "questions",
        });
    }
}
Exam.init({
    examId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
    },
    courseId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    lecturerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    sessionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    semesterId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    examDuration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    examInstruction: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    examDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    objectiveScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    totalScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    totalNoOfQuestions: {
        type: sequelize_1.DataTypes.INTEGER,
    },
}, {
    sequelize: database_1.default,
    modelName: "Exam",
});
exports.default = Exam;
