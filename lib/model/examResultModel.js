"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
class ExamResult extends sequelize_1.Model {
    static associate(models) {
        ExamResult.belongsTo(models.Exam, {
            foreignKey: 'examId', as: 'exam'
        });
        ExamResult.belongsTo(models.Student, {
            foreignKey: 'studentId', as: 'student'
        });
        ExamResult.belongsTo(models.Lecturer, {
            foreignKey: 'lecturerId', as: 'lecturer'
        });
    }
}
ExamResult.init({
    resultId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    studentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    lecturerId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    grade: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    totalMarks: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PUBLISHED', 'UPDATED')
    },
    lastUpdatedBy: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Lecturer',
            key: 'lecturerId'
        }
    }
}, {
    sequelize: database_1.default,
    modelName: 'ExamResult'
});
exports.default = ExamResult;
