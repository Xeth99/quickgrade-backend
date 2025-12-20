import { DataTypes, Model } from 'sequelize'
import sequelize from '../database/database'
import { v4 as uuidv4 } from 'uuid'
import Lecturer from './lecturerModel'
import Student from './studentModel'
import Session from './sessionModel'
import Semester from './semesterModel'
import Department from './departmentModel'

class Courses extends Model {
  static associate (models: any): void {
    Courses.belongsToMany(Student, { through: 'StudentCourses', foreignKey: 'courseId', as: 'students' })
    Courses.belongsToMany(Lecturer, { through: 'LecturerCourses', foreignKey: 'courseId', as: 'lecturers' })
    Courses.belongsTo(Session, { foreignKey: 'sessionId', as: 'session' })
    Courses.belongsTo(Semester, { foreignKey: 'semesterId', as: 'semester' })
    Courses.belongsTo(Department, {foreignKey: 'departmentId', as: 'department'})
  }
}

Courses.init(
  {
    courseId: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
      allowNull: false
    },
    courseCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    courseTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    creditUnit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    sessionId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // session: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    semesterId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    // semester: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    departmentId: {
      type: DataTypes.UUID,
      allowNull: false
    }, 
    // department: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  },
  {
    sequelize,
    modelName: 'Courses'
  }
)

export default Courses
