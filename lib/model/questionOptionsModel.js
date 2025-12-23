"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const uuid_1 = require("uuid");
const questionModel_1 = __importDefault(require("./questionModel"));
class questionOptions extends sequelize_1.Model {
    static associate(models) {
        // Define the many-to-many relationship with the Course model
        questionOptions.belongsTo(questionModel_1.default, {
            foreignKey: 'questionId',
            as: 'question'
        });
    }
}
questionOptions.init({
    optionId: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: () => (0, uuid_1.v4)(),
        primaryKey: true,
        allowNull: false
    },
    optionA: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    optionB: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    optionC: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    optionD: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    correctOption: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database_1.default,
    modelName: 'questionOptions'
});
exports.default = questionOptions;
