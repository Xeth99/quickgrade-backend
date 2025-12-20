import { DataTypes, Model } from "sequelize";
import sequelize from "../database/database";
import { v4 as uuidv4 } from 'uuid'
import Lecturer from "./lecturerModel";
import Department from "./departmentModel";

class Faculty extends Model {
    static associate(models: any): void {
        Faculty.hasMany(Department, { foreignKey: 'facultyId', as: 'departments' })
    }
}
Faculty.init({
    facultyId: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: uuidv4()
    },
    facultyName: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Faculty'
});

export default Faculty