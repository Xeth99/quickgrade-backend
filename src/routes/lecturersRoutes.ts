import express from "express";
import {
  lecturerSignup,
  updateLecturerPassword,
  lecturerLogin,
  verifyOTP,
  resetPassword,
  resetPasswordToken,
  setExamQuestions,
  getLecturerDashboard,
  getGradedExams,
  gradeExam,
  createQuestions,
} from "../controller/lecturerController";
import { authenticateLecturer } from "../middleware/lecturerMiddleware";
import {
  createExamSection,
  getExamById,
  getExamQuestions,
  getExamSections,
  getLecturerExams,
} from "../controller/examsController";
const router = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/signup", lecturerSignup);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/login", lecturerLogin);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/verify-otp/", verifyOTP);
// The route for updating the students's password
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/reset-password", resetPassword);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/reset-password/:token", resetPasswordToken);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/dashboard", getLecturerDashboard);

// EXAM ROUTES
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/exams", setExamQuestions);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams", getLecturerExams);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams/:examId", getExamById);

// SECTIONS
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/exams/:examId/sections", createExamSection);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams/:examId/sections", getExamSections);

// QUESTIONS
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/sections/:examSectionId/questions", createQuestions);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/exams/:examId/questions", getExamQuestions);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post("/grade-exam-objectives/:courseCode", gradeExam);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get("/get-graded-exam-objectives/", getGradedExams);

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.put(
  "/dashboard/change-password",
  authenticateLecturer,
  updateLecturerPassword
);
// Retrieve and return lecturer profile

export default router;
