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
exports.getExamQuestions = exports.getExamSections = exports.createExamSection = exports.getExamById = exports.getLecturerExams = void 0;
const examModel_1 = __importDefault(require("../model/examModel"));
const examSectionModel_1 = __importDefault(require("../model/examSectionModel"));
const getLecturerExams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lecturerId } = req.query;
    try {
        const exams = yield examModel_1.default.findAll({ where: { lecturerId } });
        res.json({ exams });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch exams" });
    }
});
exports.getLecturerExams = getLecturerExams;
const getExamById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { examId } = req.params;
    const { lecturerId } = req.query;
    try {
        const exam = yield examModel_1.default.findOne({
            where: { id: examId, lecturerId },
        });
        if (!exam) {
            res.status(404).json({ message: "Exam not found" });
            return;
        }
        res.json({ exam });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch exam" });
    }
});
exports.getExamById = getExamById;
const createExamSection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { examId } = req.params;
    const { sectionLabel, questionType, scoreObtainable, numberOfQuestions } = req.body;
    if (!sectionLabel ||
        !questionType ||
        !scoreObtainable ||
        !numberOfQuestions) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    try {
        const exam = yield examSectionModel_1.default.create({
            examId,
            sectionLabel,
            questionType,
            scoreObtainable,
            numberOfQuestions,
        });
        res.json({ exam });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create exam section" });
    }
});
exports.createExamSection = createExamSection;
const getExamSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examId } = req.params;
        const examSections = yield examSectionModel_1.default.findAll({ where: { examId } });
        res.json({ examSections });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch exam sections" });
    }
});
exports.getExamSections = getExamSections;
const getExamQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { examId } = req.params;
    try {
        const questions = yield examModel_1.default.findAll({ where: { examId } });
        res.json({ questions });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch questions" });
    }
});
exports.getExamQuestions = getExamQuestions;
