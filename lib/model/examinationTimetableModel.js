"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamStatus = exports.ExaminationTimetable = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const examModel_1 = __importDefault(require("./examModel"));
const sessionModel_1 = __importDefault(require("./sessionModel"));
const courseModel_1 = __importDefault(require("./courseModel"));
const uuid_1 = require("uuid");
var ExamStatus;
(function (ExamStatus) {
    ExamStatus["Pending"] = "pending";
    ExamStatus["Completed"] = "completed";
    ExamStatus["Uncompleted"] = "uncompleted";
    ExamStatus["Ongoing"] = "ongoing";
    ExamStatus["Postponed"] = "postponed";
    ExamStatus["Cancelled"] = "cancelled";
})(ExamStatus || (exports.ExamStatus = ExamStatus = {}));
class ExaminationTimetable extends sequelize_1.Model {
    static associate() {
        ExaminationTimetable.belongsTo(examModel_1.default, {
            foreignKey: "examId",
            as: "exam",
        });
        ExaminationTimetable.belongsTo(courseModel_1.default, {
            foreignKey: "courseId",
            as: "course",
        });
        ExaminationTimetable.belongsTo(sessionModel_1.default, {
            foreignKey: "sessionId",
            as: "session",
        });
    }
}
exports.ExaminationTimetable = ExaminationTimetable;
ExaminationTimetable.init({
    timetableId: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: (0, uuid_1.v4)(),
    },
    examDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(ExamStatus)),
        allowNull: false,
    },
    examId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    courseId: {
        type: sequelize_1.DataTypes.UUID,
    },
    sessionId: {
        type: sequelize_1.DataTypes.UUID,
    },
}, {
    sequelize: database_1.default,
    modelName: "ExaminationTimetable",
});
// app.get('/api/examination-timetable', async (_, res) => {   const timetable = await ExaminationTimetable.findAll();   res.json(timetable); });
