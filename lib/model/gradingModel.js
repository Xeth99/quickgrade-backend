"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const examModel_1 = __importDefault(require("./examModel"));
const studentResponseModel_1 = __importDefault(require("./studentResponseModel"));
const studentModel_1 = __importDefault(require("./studentModel"));
class Grading extends sequelize_1.Model {
    static associate() {
        Grading.belongsTo(examModel_1.default, { foreignKey: "examId", as: "exam" });
        Grading.belongsTo(studentResponseModel_1.default, {
            foreignKey: "responseId",
            as: "studentResponse",
        });
        Grading.belongsTo(studentModel_1.default, { foreignKey: "studentId", as: "student" });
    }
}
Grading.init({
    gradingId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false,
    },
    studentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    responseId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
    },
    courseCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    objectiveGrade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fillInTheGapGrade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    theoryGrade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    totalGrade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    lastUpdatedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "Grading",
});
exports.default = Grading;
