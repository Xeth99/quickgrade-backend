"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
class Exam extends sequelize_1.Model {
    static associate(models) {
        Exam.belongsTo(models.Courses, {
            foreignKey: 'courseCode',
            as: 'course'
        });
        Exam.belongsTo(models.Lecturer, {
            foreignKey: 'lecturerId',
            as: 'lecturer'
        });
        Exam.belongsTo(models.Department, {
            foreignKey: 'departmentId', as: 'department'
        });
        Exam.belongsTo(models.Session, {
            foreignKey: 'sessionId', as: 'session'
        });
        Exam.belongsTo(models.Semester, {
            foreignKey: 'semesterId', as: 'semester'
        });
        Exam.hasOne(models.ExaminationTimetable, {
            foreignKey: 'examId',
            as: 'examinationTimetable'
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
        allowNull: false
    },
    lecturerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    sessionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    semesterId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    examDuration: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    examInstruction: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    // courseCode: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // firstSection: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // secondSection: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // thirdSection: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // courseTitle: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // semester: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // session: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // faculty: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // department: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // examDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    totalScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    totalNoOfQuestions: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    sequelize: database_1.default,
    modelName: 'Exam'
});
exports.default = Exam;
