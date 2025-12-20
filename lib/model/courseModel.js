"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const lecturerModel_1 = __importDefault(require("./lecturerModel"));
const studentModel_1 = __importDefault(require("./studentModel"));
const sessionModel_1 = __importDefault(require("./sessionModel"));
const semesterModel_1 = __importDefault(require("./semesterModel"));
const departmentModel_1 = __importDefault(require("./departmentModel"));
class Courses extends sequelize_1.Model {
    static associate(models) {
        Courses.belongsToMany(studentModel_1.default, { through: 'StudentCourses', foreignKey: 'courseId', as: 'students' });
        Courses.belongsToMany(lecturerModel_1.default, { through: 'LecturerCourses', foreignKey: 'courseId', as: 'lecturers' });
        Courses.belongsTo(sessionModel_1.default, { foreignKey: 'sessionId', as: 'session' });
        Courses.belongsTo(semesterModel_1.default, { foreignKey: 'semesterId', as: 'semester' });
        Courses.belongsTo(departmentModel_1.default, { foreignKey: 'departmentId', as: 'department' });
    }
}
Courses.init({
    courseId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false
    },
    courseCode: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    courseTitle: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    creditUnit: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sessionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    // session: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    semesterId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    // semester: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    departmentId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    // department: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
}, {
    sequelize: database_1.default,
    modelName: 'Courses'
});
exports.default = Courses;
