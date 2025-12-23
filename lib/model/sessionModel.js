"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const semesterModel_1 = __importDefault(require("../model/semesterModel"));
const courseModel_1 = __importDefault(require("../model/courseModel"));
const uuid_1 = require("uuid");
class Session extends sequelize_1.Model {
    static associate() {
        Session.hasMany(semesterModel_1.default, { foreignKey: "sessionId", as: "semesters" });
        Session.hasMany(courseModel_1.default, { foreignKey: "sessionId", as: "courses" });
    }
}
Session.init({
    sessionId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false,
    },
    startYear: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    endYear: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    sessionLabel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: database_1.default,
    modelName: "Session",
});
exports.default = Session;
