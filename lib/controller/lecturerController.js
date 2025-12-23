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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGradedExams = exports.getLecturerDashboard = exports.gradeExam = exports.createQuestions = exports.setExamQuestions = exports.getCourses = exports.updateLecturerPassword = exports.verifyOTP = exports.resetPasswordToken = exports.resetPassword = exports.lecturerLogin = exports.lecturerSignup = void 0;
const lecturerModel_1 = __importDefault(require("../model/lecturerModel"));
const studentModel_1 = __importDefault(require("../model/studentModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailsender_1 = require("../utils/emailsender");
const crypto_1 = __importDefault(require("crypto"));
const speakeasy_1 = __importDefault(require("speakeasy"));
const questionModel_1 = __importDefault(require("../model/questionModel"));
const examModel_1 = __importDefault(require("../model/examModel"));
const courseModel_1 = __importDefault(require("../model/courseModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const studentResponseModel_1 = __importDefault(require("../model/studentResponseModel"));
const gradingModel_1 = __importDefault(require("../model/gradingModel"));
const examSectionModel_1 = __importDefault(require("../model/examSectionModel"));
const secret = (_a = process.env.SESSION_SECRET) !== null && _a !== void 0 ? _a : "";
const lecturerSignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, faculty, department, password, email, title } = req.body;
        const existingLecturer = yield lecturerModel_1.default.findOne({ where: { email } });
        if (existingLecturer) {
            res.status(400).json({
                existingLecturerError: "Lecturer already exists",
            });
        }
        else {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
            const noOfLecturer = ((yield lecturerModel_1.default.count()) + 1)
                .toString()
                .padStart(4, "0");
            const employeeID = `ELQNCE/${faculty.toUpperCase().slice(0, 2)}/${department.toUpperCase().slice(0, 3)}/${noOfLecturer}`;
            const createdLecturer = yield lecturerModel_1.default.create({
                firstName,
                lastName,
                faculty,
                title,
                department,
                password: hashedPassword,
                email,
                employeeID,
            });
            // sending employeeID  and password to Lecturer email
            if (!createdLecturer) {
                res.status(400).json({
                    failedSignup: "Lecturer signup failed",
                });
            }
            else {
                const lecturerDetail = yield lecturerModel_1.default.findOne({ where: { email } });
                if (!lecturerDetail) {
                    res
                        .status(400)
                        .json({ lecturerNotFoundError: "Lecturer record not found" });
                }
                else {
                    const totpSecret = speakeasy_1.default.generateSecret({ length: 20 });
                    // Update the lecturer instance with TOTP details
                    yield lecturerDetail.update({
                        otpSecret: totpSecret.base32,
                        otp: speakeasy_1.default.totp({
                            secret: totpSecret.base32,
                            encoding: "base32",
                        }),
                        otpExpiration: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
                    });
                    const mailOptions = {
                        from: {
                            name: "EloQuence App",
                            address: "cxz3th@gmail.com",
                        },
                        to: email,
                        subject: "EloQuence - Email Verification Code",
                        text: `TOTP: ${lecturerDetail.otp}`,
                        html: `<h2>Dear ${lecturerDetail.dataValues.lastName}, </h2> <br>
        <h3>Thank you for signing up for EloQuence. Copy OTP below to verify your email:
        <h1>${lecturerDetail.otp}</h1> <br>
        This OTP will expire in 10 minutes. If you did not sign up for EloQuence account,
        you can safely ignore this email. <br>

        Best regards, <br>
        The EloQuence Team</h3>`,
                    };
                    yield emailsender_1.transporter.sendMail(mailOptions);
                    res.json({ successfulSignup: "lecturer signup successful" });
                }
            }
        }
    }
    catch (error) {
        res.status(500).json({
            message: error,
        });
    }
});
exports.lecturerSignup = lecturerSignup;
const lecturerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeID, password } = req.body;
    try {
        const existingLecturer = yield lecturerModel_1.default.findOne({ where: { employeeID } });
        if (!existingLecturer) {
            res.status(400).json({
                lecturerNotFoundError: "Invalid lecturerId",
            });
        }
        else {
            const isPasswordValid = yield bcryptjs_1.default.compare(password, existingLecturer.dataValues.password);
            if (!isPasswordValid) {
                res.status(400).json({
                    inValidPassword: "Invalid password",
                });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ loginkey: existingLecturer.dataValues.lecturerId }, secret, { expiresIn: "1h" });
                res.json({ token: token });
                // res.cookie('lecturerToken', token)
                // res.json({
                //   successfulLogin: 'login successful'
                // })
            }
        }
    }
    catch (error) {
        res.status(500).json({
            internalServerError: error,
        });
    }
});
exports.lecturerLogin = lecturerLogin;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const user = yield lecturerModel_1.default.findOne({ where: { email } });
    if (!user) {
        res.status(404).json({ userNotFoundError: "User not found" });
        return;
    }
    else {
        const token = crypto_1.default.randomBytes(20).toString("hex");
        user.resetPasswordToken = token;
        user.resetPasswordExpiration = new Date(Date.now() + 3600000); // 1 hour
        yield user.save();
        const mailOptions = {
            from: "cxz3th@gmail.com",
            to: email,
            subject: "Password Reset",
            // text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://localhost:4000/lecturers/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
        };
        yield emailsender_1.transporter.sendMail(mailOptions);
    }
    res.json({
        linkSentSuccessfully: "An email has been sent to the address provided with further instructions.",
    });
});
exports.resetPassword = resetPassword;
const resetPasswordToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password } = req.body;
    const user = yield lecturerModel_1.default.findOne({ where: { resetPasswordToken: token } });
    if (!user) {
        res.status(404).json({
            invalidPasswordResetToken: "Password reset token is invalid or has expired.",
        });
        return;
    }
    if (!user.resetPasswordExpiration ||
        Date.now() > user.resetPasswordExpiration.getTime()) {
        res.status(401).json({
            tokenExpired: "Password reset token is invalid or has expired.",
        });
        return;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiration = null;
    yield user.save();
    res.json({ passwordResetSuccessful: "Your password has been reset!" });
});
exports.resetPasswordToken = resetPasswordToken;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otp } = req.body;
        const lecturer = yield lecturerModel_1.default.findOne({ where: { otp } });
        const email = lecturer === null || lecturer === void 0 ? void 0 : lecturer.dataValues.email;
        if (!lecturer) {
            res.status(400).json({ invalidOtp: "Invalid otp" });
        }
        else {
            const now = new Date();
            if (now > lecturer.otpExpiration) {
                res.status(400).json({ expiredOtpError: "OTP has expired" });
                return;
            }
            yield lecturer.update({
                isVerified: true,
                otp: null,
                otpExpiration: null,
                otpSecret: null,
            });
            // res.redirect('http://localhost:5173/students/reset-password')
            const mailOptions = {
                from: {
                    name: "EloQuence App",
                    address: "cxz3th@gmail.com",
                },
                to: email,
                subject: "EloQuence - Login Details",
                text: "Login Detail",
                html: `<h2>Dear ${lecturer.dataValues.firstName},</h2> <br>
          <h3>Your Account has been successfully created and Email verification is successful. kindly find your login details below: <br>
          <h1> EmployeeID: ${lecturer.dataValues.employeeID}</h1>
          <br>
          <h3>Best regards,<br>
          <h3>The EloQuence Team</h3>`,
            };
            yield emailsender_1.transporter.sendMail(mailOptions);
            res.json({ OtpVerificationSuccess: "OTP verified successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.verifyOTP = verifyOTP;
const updateLecturerPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lecturerId = (_a = req.lecturer) === null || _a === void 0 ? void 0 : _a.lecturerId;
    const { newPassword } = req.body;
    try {
        // Find the user by ID
        const user = yield lecturerModel_1.default.findByPk(lecturerId);
        if (!user) {
            res.status(404).json({ error: "User not found" });
        }
        else {
            user.dataValues.password = newPassword;
            // Save the updated user to the database
            yield user.save();
            res.status(200).json({ message: "Password updated successfully" });
        }
        // Update the user's password
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.updateLecturerPassword = updateLecturerPassword;
const getCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semester, session } = req.body;
        const courses = yield courseModel_1.default.findAll({
            where: {
                semester,
                session,
            },
        });
        if (!courses) {
            res.status(400).json({
                message: "courses not available",
            });
        }
        else {
            res.json({
                message: "Here are the available courses",
                data: courses,
            });
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getCourses = getCourses;
const setExamQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId, lecturerId, departmentId, sessionId, semesterId, examDuration, examInstruction, examDate, totalScore, totalNoOfQuestions, } = req.body;
        if (!courseId ||
            !lecturerId ||
            !departmentId ||
            !sessionId ||
            !semesterId ||
            !examDuration ||
            !examInstruction ||
            !examDate ||
            !totalScore ||
            !totalNoOfQuestions) {
            res.status(400).json({ message: "All fields are required" });
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const createdExam = yield examModel_1.default.create({
            courseId,
            lecturerId,
            departmentId,
            sessionId,
            semesterId,
            examDuration,
            examInstruction,
            examDate,
            totalScore,
            totalNoOfQuestions,
        });
        res.status(201).json({
            message: "Exam created successfully",
            examId: createdExam.dataValues.examId,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create exam" });
    }
});
exports.setExamQuestions = setExamQuestions;
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
const gradeExam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { examId } = req.params;
        const { studentId, responses } = req.body;
        if (!examId || !studentId || !Array.isArray(responses)) {
            res.status(400).json({ message: "Invalid request payload" });
            return;
        }
        const exam = yield examModel_1.default.findByPk(examId);
        if (!exam) {
            res.status(400).json({ message: "Exam not found" });
            return;
        }
        const saveResponses = yield Promise.all(responses.map((responseItem) => __awaiter(void 0, void 0, void 0, function* () {
            const question = yield questionModel_1.default.findByPk(responseItem.questionId);
            if (!question)
                return null;
            const isCorrect = question.correctAnswer === responseItem.answer &&
                question.questionType === "Objective";
            return studentResponseModel_1.default.create({
                studentId,
                examId,
                questionId: responseItem.questionId,
                responseText: responseItem.answer,
                isCorrect,
            });
        })));
        const validResponses = saveResponses.filter((r) => {
            return r !== null;
        });
        const objectiveQuestions = yield questionModel_1.default.findAll({
            where: { examId, questionType: "Objective" },
        });
        const objectiveSection = yield examSectionModel_1.default.findOne({
            where: { examId, questionType: "Objective" },
        });
        const totalQuestions = objectiveQuestions.length;
        const correctCount = validResponses.filter((r) => r.dataValues.isCorrect).length;
        const sectionScore = (_b = (_a = objectiveSection === null || objectiveSection === void 0 ? void 0 : objectiveSection.dataValues) === null || _a === void 0 ? void 0 : _a.scoreObtainable) !== null && _b !== void 0 ? _b : 0;
        const objectiveGrade = totalQuestions > 0 ? (correctCount / totalQuestions) * sectionScore : 0;
        const grading = yield gradingModel_1.default.create({
            studentId,
            examId,
            responseId: validResponses[0].dataValues.responseId,
            objectiveGrade,
            theoryGrade: 0,
            fillInTheGapGrade: 0,
            totalGrade: objectiveGrade,
            semesterId: exam.semesterId,
        });
        res.status(200).json({ message: "Exam graded successfully", grading });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.gradeExam = gradeExam;
const getLecturerDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const semester = req.query.semester || 'first semester'
        const exams = yield examModel_1.default.findAll();
        const student = yield studentModel_1.default.findAll();
        const noOfStudents = student.length;
        const examsTotal = exams.map((exam) => (Object.assign(Object.assign({}, exam.dataValues), { noOfStudents })));
        res.json({ examsTotal });
    }
    catch (error) {
        res.status(500).json({ error });
    }
});
exports.getLecturerDashboard = getLecturerDashboard;
const getGradedExams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { lecturerId, semester } = req.query;
        if (!lecturerId || !semester) {
            res.status(400).json({ message: "All fields are required" });
        }
        const exams = yield examModel_1.default.findAll({
            where: { lecturerId, semester },
            attributes: ["examId"],
        });
        if (exams.length === 0) {
            res.status(200).json({ studentResult: [] });
            return;
        }
        const examIds = exams.map((exam) => exam.dataValues.examId);
        const gradings = yield gradingModel_1.default.findAll({
            where: { examId: examIds },
            include: [{ model: studentModel_1.default, attributes: ["studentId", "matricNo"] }],
        });
        const studentResult = gradings.map((grading) => {
            var _a, _b, _c;
            return (Object.assign(Object.assign({}, grading.dataValues), { matricNo: (_c = (_b = (_a = grading === null || grading === void 0 ? void 0 : grading.dataValues) === null || _a === void 0 ? void 0 : _a.student) === null || _b === void 0 ? void 0 : _b.matricNo) !== null && _c !== void 0 ? _c : "" }));
        });
        res.status(200).json({ studentResult });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getGradedExams = getGradedExams;
