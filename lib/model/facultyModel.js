"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const departmentModel_1 = __importDefault(require("./departmentModel"));
class Faculty extends sequelize_1.Model {
    static associate(models) {
        Faculty.hasMany(departmentModel_1.default, { foreignKey: 'facultyId', as: 'departments' });
    }
}
Faculty.init({
    facultyId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: (0, uuid_1.v4)()
    },
    facultyName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'Faculty'
});
exports.default = Faculty;
