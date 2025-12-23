"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExamTimetable = void 0;
const courseModel_1 = __importDefault(require("../model/courseModel"));
const examModel_1 = __importDefault(require("../model/examModel"));
const examinationTimetableModel_1 = require("../model/examinationTimetableModel");
const getExamTimetable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sessionId, semester } = req.params;
        if (!sessionId || !semester) {
            return res.status(400).json({ message: 'Course code, Session and Semester are required' });
        }
        const examTimetable = yield examinationTimetableModel_1.ExaminationTimetable.findAll({
            where: {
                sessionId,
            },
            include: [
                {
                    model: examModel_1.default,
                    as: 'exam',
                    attributes: ['examId', 'examDuration', 'examInstruction', 'semester', 'examDate'],
                    where: {
                        semester
                    },
                    include: [
                        {
                            model: courseModel_1.default,
                            attributes: ['courseCode', 'courseTitle']
                        }
                    ]
                },
            ]
        });
        res.status(200).json(examTimetable);
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getExamTimetable = getExamTimetable;
