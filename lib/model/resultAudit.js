"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
class ResultAudit extends sequelize_1.Model {
    static associate(models) {
        ResultAudit.belongsTo(models.Result, {
            foreignKey: 'resultId',
            as: 'result'
        });
    }
}
ResultAudit.init({
    resultAuditId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: (0, uuid_1.v4)()
    },
    resultId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    oldScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    newScore: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    changedBy: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    changedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'ResultAudit'
});
exports.default = ResultAudit;
