"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const examModel_1 = __importDefault(require("../model/examModel"));
const questionModel_1 = __importDefault(require("../model/questionModel"));
const uuid_1 = require("uuid");
class ExamSection extends sequelize_1.Model {
    static associate(models) {
        ExamSection.belongsTo(examModel_1.default, {
            foreignKey: "examId",
            as: "exam",
        });
        ExamSection.hasMany(questionModel_1.default, {
            foreignKey: "examSectionId",
            as: "questions",
        });
    }
}
ExamSection.init({
    examSectionId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: () => (0, uuid_1.v4)(),
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    questionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    sectionLabel: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    questionType: {
        type: sequelize_1.DataTypes.ENUM("Objective", "Theory", "FillInTheGap"),
        allowNull: false,
    },
    scoreObtainable: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    numberOfQuestions: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "ExamSection",
});
exports.default = ExamSection;
