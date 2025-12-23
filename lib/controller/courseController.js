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
exports.getCourses = exports.createCourse = void 0;
const courseModel_1 = __importDefault(require("../model/courseModel"));
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseCode, courseTitle, courseUnit, sessionId, semesterId, departmentId, } = req.body;
        if (!courseCode ||
            !courseTitle ||
            !courseUnit ||
            !sessionId ||
            !semesterId ||
            !departmentId) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const course = yield courseModel_1.default.create({
            courseCode,
            courseTitle,
            creditUnit: courseUnit,
            sessionId,
            semesterId,
            departmentId,
        });
        if (course) {
            res
                .status(200)
                .json({ message: "Course created successfully", data: course });
        }
        else {
            res.status(400).json({ message: "Failed to create course" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createCourse = createCourse;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield courseModel_1.default.findAll();
        if (courses.length === 0) {
            res.status(404).json({ message: "No course found" });
            return;
        }
        res.json({ courses });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getCourses = getCourses;
// export const getCourses = async (
//     req: Request,
//     res: Response
//   ): Promise<void> => {
//     try {
//       const { semester, session } = req.body;
//       const courses = await Courses.findAll({
//         where: {
//           semester,
//           session,
//         },
//       });
//       if (!courses) {
//         res.status(400).json({
//           message: "courses not available",
//         });
//       } else {
//         res.json({
//           message: "Here are the available courses",
//           data: courses,
//         });
//       }
//     } catch (error) {
//       res.status(500).json({ error });
//     }
//   };
