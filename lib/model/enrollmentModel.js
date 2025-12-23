"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const courseModel_1 = __importDefault(require("./courseModel"));
const studentModel_1 = __importDefault(require("./studentModel"));
class Enrollment extends sequelize_1.Model {
    static associate(models) {
        // Define the many-to-many relationship with the Course model
        Enrollment.belongsTo(courseModel_1.default, {
            foreignKey: 'courseId',
            as: 'course'
        });
        Enrollment.belongsTo(studentModel_1.default, {
            foreignKey: 'studentId',
            as: 'student'
        });
    }
}
Enrollment.init({
    enrollmentId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false
    },
    courseId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    studentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    enrollmentDate: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: Date.now,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'Enrollment'
});
exports.default = Enrollment;
