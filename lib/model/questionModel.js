"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const examModel_1 = __importDefault(require("./examModel"));
const lecturerModel_1 = __importDefault(require("./lecturerModel"));
const courseModel_1 = __importDefault(require("./courseModel"));
const examSectionModel_1 = __importDefault(require("./examSectionModel"));
class Question extends sequelize_1.Model {
    static associate(models) {
        Question.belongsTo(examModel_1.default, {
            foreignKey: "examId",
            as: "exam",
        });
        Question.belongsTo(lecturerModel_1.default, {
            foreignKey: "lecturerId",
            as: "lecturer",
        });
        Question.belongsTo(courseModel_1.default, {
            foreignKey: "courseCode",
            as: "course",
        });
        Question.belongsTo(examSectionModel_1.default, {
            foreignKey: "examSectionId",
            as: "examSection",
        });
    }
}
Question.init({
    questionId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false,
    },
    examSectionId: {
        type: sequelize_1.DataTypes.UUID,
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
    },
    lecturerId: {
        type: sequelize_1.DataTypes.UUID,
    },
    questionText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    optionA: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    optionB: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    optionC: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    optionD: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    courseCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    correctAnswer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    questionType: {
        type: sequelize_1.DataTypes.ENUM("Objective", "Theory", "FillInTheGap"),
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "Question",
});
exports.default = Question;
