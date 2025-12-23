import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import Semester from "../model/semesterModel";
import Courses from "../model/courseModel";
import { v4 as uuidv4 } from "uuid";

class Session extends Model {
  static associate() {
    Session.hasMany(Semester, { foreignKey: "sessionId", as: "semesters" });
    Session.hasMany(Courses, { foreignKey: "sessionId", as: "courses" });
  }
}

Session.init(
  {
    sessionId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false,
    },
    startYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    endYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessionLabel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Session",
  }
);

export default Session;
