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
exports.createQuestions = void 0;
const examModel_1 = __importDefault(require("../model/examModel"));
const questionModel_1 = __importDefault(require("../model/questionModel"));
const createQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { examId, lecturerId, questions } = req.body;
        if (!examId || !lecturerId || !questions) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const exam = yield examModel_1.default.findByPk(examId);
        if (!exam) {
            res.status(400).json({ message: "Exam not found" });
            return;
        }
        const formattedQuestions = questions.map((q) => {
            var _a, _b, _c, _d;
            return ({
                examId,
                examSectionId: q.examSectionId,
                lecturerId,
                questionText: q.questionText,
                optionA: (_a = q.optionA) !== null && _a !== void 0 ? _a : null,
                optionB: (_b = q.optionB) !== null && _b !== void 0 ? _b : null,
                optionC: (_c = q.optionC) !== null && _c !== void 0 ? _c : null,
                optionD: (_d = q.optionD) !== null && _d !== void 0 ? _d : null,
                correctAnswer: q.questionType === "Objective" ||
                    q.questionType === "FillInTheGap" ||
                    q.questionType === "Theory"
                    ? q.correctAnswer
                    : null,
                questiomType: q.questionType,
                courseCode: q.courseCode,
            });
        });
        const createdQuestions = yield questionModel_1.default.bulkCreate(formattedQuestions);
        res.status(201).json({
            message: "Questions created successfully",
            count: createdQuestions.length,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create questions" });
    }
});
exports.createQuestions = createQuestions;
