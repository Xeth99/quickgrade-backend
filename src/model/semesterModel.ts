import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import Courses from '../model/courseModel'
import Session from '../model/sessionModel'
import { v4 as uuidv4 } from 'uuid'

class Semester extends Model {
  static associate (models: any): void {
    Semester.belongsTo(Session, { foreignKey: 'sessionId', as: 'session' })
    Semester.hasMany(Courses, { foreignKey: 'semesterId', as: 'courses' })
  }
}

Semester.init(
  {
    semesterId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    semester: {
      type: DataTypes.ENUM('First Semester', 'Second Semester'),
      allowNull: false
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false
    }

  },
  {
    sequelize,
    modelName: 'Semester'
  }
)

export default Semester
