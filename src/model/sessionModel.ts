import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import Semester from '../model/semesterModel'
import Courses from '../model/courseModel'
import { v4 as uuidv4 } from 'uuid'

class Session extends Model {
  static associate (models: any): void {
    Session.hasMany(Semester, { foreignKey: 'sessionId', as: 'sessionSemesters' })
    Session.hasMany(Courses, { foreignKey: 'session', as: 'sessionCourses' })
  }
}

Session.init(
  {
    sessionId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Session'
  }
)

export default Session
