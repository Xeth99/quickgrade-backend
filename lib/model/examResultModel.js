"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const examModel_1 = __importDefault(require("./examModel"));
const studentModel_1 = __importDefault(require("./studentModel"));
const lecturerModel_1 = __importDefault(require("./lecturerModel"));
class ExamResult extends sequelize_1.Model {
    static associate(models) {
        ExamResult.belongsTo(examModel_1.default, {
            foreignKey: "examId",
            as: "exam",
        });
        ExamResult.belongsTo(studentModel_1.default, {
            foreignKey: "studentId",
            as: "student",
        });
        ExamResult.belongsTo(lecturerModel_1.default, {
            foreignKey: "lecturerId",
            as: "lecturer",
        });
    }
}
ExamResult.init({
    resultId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false,
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    studentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    lecturerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    grade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    totalMarks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("PUBLISHED", "UPDATED"),
    },
    lastUpdatedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: "Lecturers",
            key: "lecturerId",
        },
    },
}, {
    sequelize: database_1.default,
    modelName: "ExamResult",
});
exports.default = ExamResult;
