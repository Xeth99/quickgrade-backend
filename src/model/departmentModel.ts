import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from 'uuid'
import Lecturer from "./lecturerModel";
import Courses from "./courseModel"
import Student from "./studentModel"
import Faculty from "./facultyModel"
import Exam from "./examModel"

class Department extends Model {
    static associate(models: any): void {
        Department.belongsTo(Faculty, { foreignKey: 'facultyId', as: 'faculty' })
        Department.hasMany(Lecturer, { foreignKey: 'departmentId', as: 'Lecturer' });
        Department.hasMany(Courses, { foreignKey: 'departmentId', as: 'Courses' });
        Department.hasMany(Student, { foreignKey: 'departmentId', as: 'Students' })
        Department.hasMany(Exam, { foreignKey: 'departmentId', as: 'exams' })
    }
}

Department.init({
    departmentId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4()
    },
    departmentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    facultyId: {
        type: DataTypes.UUID,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Department'
});

export default Department