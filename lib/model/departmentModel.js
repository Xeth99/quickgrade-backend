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
const studentModel_1 = __importDefault(require("./studentModel"));
const facultyModel_1 = __importDefault(require("./facultyModel"));
const examModel_1 = __importDefault(require("./examModel"));
class Department extends sequelize_1.Model {
    static associate(models) {
        Department.belongsTo(facultyModel_1.default, { foreignKey: 'facultyId', as: 'faculty' });
        Department.hasMany(lecturerModel_1.default, { foreignKey: 'departmentId', as: 'Lecturer' });
        Department.hasMany(courseModel_1.default, { foreignKey: 'departmentId', as: 'Courses' });
        Department.hasMany(studentModel_1.default, { foreignKey: 'departmentId', as: 'Students' });
        Department.hasMany(examModel_1.default, { foreignKey: 'departmentId', as: 'exams' });
    }
}
Department.init({
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: (0, uuid_1.v4)()
    },
    departmentName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    facultyId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'Department'
});
exports.default = Department;
