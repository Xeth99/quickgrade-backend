"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const gradingModel_1 = __importDefault(require("./gradingModel"));
const studentModel_1 = __importDefault(require("./studentModel"));
const examModel_1 = __importDefault(require("./examModel"));
const questionModel_1 = __importDefault(require("./questionModel"));
class StudentResponse extends sequelize_1.Model {
    static associate() {
        StudentResponse.hasMany(gradingModel_1.default, {
            foreignKey: "responseId",
            as: "gradings",
        });
        StudentResponse.belongsTo(studentModel_1.default, {
            foreignKey: "studentId",
            as: "student",
        });
        StudentResponse.belongsTo(examModel_1.default, {
            foreignKey: "examId",
            as: "exam",
        });
        StudentResponse.belongsTo(questionModel_1.default, {
            foreignKey: "questionId",
            as: "question",
        });
    }
}
StudentResponse.init({
    responseId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false,
    },
    studentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    questionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    responseText: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    courseCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "StudentResponse",
});
exports.default = StudentResponse;
