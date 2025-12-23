import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from "uuid";
import ExamResult from "./examResultModel";

class ResultAudit extends Model {
  static associate(models: any): void {
    ResultAudit.belongsTo(ExamResult, {
      foreignKey: "resultId",
      as: "result",
    });
  }
}

ResultAudit.init(
  {
    resultAuditId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    resultId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    oldScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    newScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    changedBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    changedByRole: {
      type: DataTypes.ENUM("LECTURER", "ADMIN"),
      allowNull: false,
    },
    changedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ResultAudit",
  }
);

export default ResultAudit;
