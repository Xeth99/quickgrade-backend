"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const courseModel_1 = __importDefault(require("../model/courseModel"));
const sessionModel_1 = __importDefault(require("../model/sessionModel"));
const uuid_1 = require("uuid");
class Semester extends sequelize_1.Model {
    static associate(models) {
        Semester.belongsTo(sessionModel_1.default, { foreignKey: 'sessionId', as: 'session' });
        Semester.hasMany(courseModel_1.default, { foreignKey: 'semesterId', as: 'courses' });
    }
}
Semester.init({
    semesterId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false
    },
    semester: {
        type: sequelize_1.DataTypes.ENUM('First Semester', 'Second Semester'),
        allowNull: false
    },
    sessionId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'Semester'
});
exports.default = Semester;
