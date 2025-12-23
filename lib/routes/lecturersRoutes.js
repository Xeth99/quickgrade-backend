"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lecturerController_1 = require("../controller/lecturerController");
const lecturerMiddleware_1 = require("../middleware/lecturerMiddleware");
const examsController_1 = require("../controller/examsController");
const router = express_1.default.Router();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/signup", lecturerController_1.lecturerSignup);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/login", lecturerController_1.lecturerLogin);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/verify-otp/", lecturerController_1.verifyOTP);
// The route for updating the students's password
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/reset-password", lecturerController_1.resetPassword);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/reset-password/:token", lecturerController_1.resetPasswordToken);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/dashboard", lecturerController_1.getLecturerDashboard);
// EXAM ROUTES
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/exams", lecturerController_1.setExamQuestions);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams", examsController_1.getLecturerExams);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams/:examId", examsController_1.getExamById);
// SECTIONS
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/exams/:examId/sections", examsController_1.createExamSection);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams/:examId/sections", examsController_1.getExamSections);
// QUESTIONS
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/sections/:examSectionId/questions", lecturerController_1.createQuestions);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams/:examId/questions", examsController_1.getExamQuestions);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/grade-exam-objectives/:courseCode", lecturerController_1.gradeExam);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/get-graded-exam-objectives/", lecturerController_1.getGradedExams);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put("/dashboard/change-password", lecturerMiddleware_1.authenticateLecturer, lecturerController_1.updateLecturerPassword);
// Retrieve and return lecturer profile
exports.default = router;
