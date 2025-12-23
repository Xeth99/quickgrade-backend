import Lecturer from "../model/lecturerModel";
import Student from "../model/studentModel";
import { type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import type { AuthRequest } from "../../extender";
import { transporter } from "../utils/emailsender";
import crypto from "crypto";
import speakeasy from "speakeasy";
import Question from "../model/questionModel";
import Exam from "../model/examModel";
import Courses from "../model/courseModel";
import jwt from "jsonwebtoken";
import StudentResponse from "../model/studentResponseModel";
import Grading from "../model/gradingModel";
import ExamSection from "../model/examSectionModel";

const secret: string = process.env.SESSION_SECRET ?? "";

export const lecturerSignup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, faculty, department, password, email, title } =
      req.body;
    const existingLecturer = await Lecturer.findOne({ where: { email } });

    if (existingLecturer) {
      res.status(400).json({
        existingLecturerError: "Lecturer already exists",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const noOfLecturer = ((await Lecturer.count()) + 1)
        .toString()
        .padStart(4, "0");
      const employeeID = `ELQNCE/${faculty.toUpperCase().slice(0, 2)}/${department.toUpperCase().slice(0, 3)}/${noOfLecturer}`;
      const createdLecturer = await Lecturer.create({
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
      } else {
        const lecturerDetail = await Lecturer.findOne({ where: { email } });

        if (!lecturerDetail) {
          res
            .status(400)
            .json({ lecturerNotFoundError: "Lecturer record not found" });
        } else {
          const totpSecret = speakeasy.generateSecret({ length: 20 });

          // Update the lecturer instance with TOTP details
          await lecturerDetail.update({
            otpSecret: totpSecret.base32,
            otp: speakeasy.totp({
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
          await transporter.sendMail(mailOptions);
          res.json({ successfulSignup: "lecturer signup successful" });
        }
      }
    }
  } catch (error: any) {
    res.status(500).json({
      message: error,
    });
  }
};

export const lecturerLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { employeeID, password } = req.body;

  try {
    const existingLecturer = await Lecturer.findOne({ where: { employeeID } });

    if (!existingLecturer) {
      res.status(400).json({
        lecturerNotFoundError: "Invalid lecturerId",
      });
    } else {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingLecturer.dataValues.password
      );
      if (!isPasswordValid) {
        res.status(400).json({
          inValidPassword: "Invalid password",
        });
      } else {
        const token = jwt.sign(
          { loginkey: existingLecturer.dataValues.lecturerId },
          secret,
          { expiresIn: "1h" }
        );
        res.json({ token: token });
        // res.cookie('lecturerToken', token)

        // res.json({
        //   successfulLogin: 'login successful'
        // })
      }
    }
  } catch (error: any) {
    res.status(500).json({
      internalServerError: error,
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const user = await Lecturer.findOne({ where: { email } });

  if (!user) {
    res.status(404).json({ userNotFoundError: "User not found" });
    return;
  } else {
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpiration = new Date(Date.now() + 3600000); // 1 hour
    await user.save();

    const mailOptions = {
      from: "cxz3th@gmail.com",
      to: email,
      subject: "Password Reset",
      // text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://${req.headers.host}/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\nhttp://localhost:4000/lecturers/reset-password/${token}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);
  }

  res.json({
    linkSentSuccessfully:
      "An email has been sent to the address provided with further instructions.",
  });
};

export const resetPasswordToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await Lecturer.findOne({ where: { resetPasswordToken: token } });

  if (!user) {
    res.status(404).json({
      invalidPasswordResetToken:
        "Password reset token is invalid or has expired.",
    });
    return;
  }

  if (
    !user.resetPasswordExpiration ||
    Date.now() > user.resetPasswordExpiration.getTime()
  ) {
    res.status(401).json({
      tokenExpired: "Password reset token is invalid or has expired.",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;

  user.resetPasswordToken = null;
  user.resetPasswordExpiration = null;
  await user.save();

  res.json({ passwordResetSuccessful: "Your password has been reset!" });
};
export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { otp } = req.body;
    const lecturer = await Lecturer.findOne({ where: { otp } });
    const email = lecturer?.dataValues.email;

    if (!lecturer) {
      res.status(400).json({ invalidOtp: "Invalid otp" });
    } else {
      const now = new Date();
      if (now > lecturer.otpExpiration) {
        res.status(400).json({ expiredOtpError: "OTP has expired" });
        return;
      }

      await lecturer.update({
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

      await transporter.sendMail(mailOptions);
      res.json({ OtpVerificationSuccess: "OTP verified successfully" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateLecturerPassword = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const lecturerId = req.lecturer?.lecturerId;

  const { newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await Lecturer.findByPk(lecturerId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    } else {
      user.dataValues.password = newPassword;

      // Save the updated user to the database
      await user.save();

      res.status(200).json({ message: "Password updated successfully" });
    }

    // Update the user's password
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { semester, session } = req.body;

    const courses = await Courses.findAll({
      where: {
        semester,
        session,
      },
    });

    if (!courses) {
      res.status(400).json({
        message: "courses not available",
      });
    } else {
      res.json({
        message: "Here are the available courses",
        data: courses,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const setExamQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      courseId,
      lecturerId,
      departmentId,
      sessionId,
      semesterId,
      examDuration,
      examInstruction,
      examDate,
      objectiveScore,
      totalScore,
      totalNoOfQuestions,
    } = req.body;

    if (
      !courseId ||
      !lecturerId ||
      !departmentId ||
      !sessionId ||
      !semesterId ||
      !examDuration ||
      !examInstruction ||
      !examDate ||
      !objectiveScore ||
      !totalScore ||
      !totalNoOfQuestions
    ) {
      res.status(400).json({ message: "All fields are required" });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createdExam = await Exam.create({
      courseId,
      lecturerId,
      departmentId,
      sessionId,
      semesterId,
      examDuration,
      examInstruction,
      examDate,
      objectiveScore,
      totalScore,
      totalNoOfQuestions,
    });
    res.status(201).json({
      message: "Exam created successfully",
      createdExam,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create exam" });
  }
};

export const createQuestions = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { examId, lecturerId, questions } = req.body;
    if (!examId || !lecturerId || !questions) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const exam = await Exam.findByPk(examId);
    if (!exam) {
      res.status(400).json({ message: "Exam not found" });
      return;
    }

    const formattedQuestions = questions.map((q: any) => ({
      examId,
      examSectionId: q.examSectionId,
      lecturerId,
      questionText: q.questionText,
      optionA: q.optionA ?? null,
      optionB: q.optionB ?? null,
      optionC: q.optionC ?? null,
      optionD: q.optionD ?? null,
      correctAnswer:
        q.questionType === "Objective" ||
        q.questionType === "FillInTheGap" ||
        q.questionType === "Theory"
          ? q.correctAnswer
          : null,
      questiomType: q.questionType,
      courseCode: q.courseCode,
    }));
    const createdQuestions = await Question.bulkCreate(formattedQuestions);
    res.status(201).json({
      message: "Questions created successfully",
      count: createdQuestions.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create questions" });
  }
};

export const gradeExam = async (req: Request, res: Response): Promise<void> => {
  try {
    const { examId } = req.params;
    const { studentId, responses } = req.body;

    if (!examId || !studentId || !Array.isArray(responses)) {
      res.status(400).json({ message: "Invalid request payload" });
      return;
    }
    const exam = await Exam.findByPk(examId);
    if (!exam) {
      res.status(400).json({ message: "Exam not found" });
      return;
    }
    const saveResponses = await Promise.all(
      responses.map(async (responseItem) => {
        const question = await Question.findByPk(responseItem.questionId);

        if (!question) return null;

        const isCorrect =
          question.correctAnswer === responseItem.answer &&
          question.questionType === "Objective";
        return StudentResponse.create({
          studentId,
          examId,
          questionId: responseItem.questionId,
          responseText: responseItem.answer,
          isCorrect,
        });
      })
    );

    const validResponses = saveResponses.filter((r): r is StudentResponse => {
      return r !== null;
    });

    const objectiveQuestions = await Question.findAll({
      where: { examId, questionType: "Objective" },
    });

    const objectiveSection = await ExamSection.findOne({
      where: { examId, questionType: "Objective" },
    });

    const totalQuestions = objectiveQuestions.length;
    const correctCount = validResponses.filter(
      (r) => r.dataValues.isCorrect
    ).length;
    const sectionScore = objectiveSection?.dataValues?.scoreObtainable ?? 0;

    const objectiveGrade =
      totalQuestions > 0 ? (correctCount / totalQuestions) * sectionScore : 0;

    const grading = await Grading.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getLecturerDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // const semester = req.query.semester || 'first semester'

    const exams = await Exam.findAll();

    const student = await Student.findAll();

    const noOfStudents = student.length;

    const examsTotal = exams.map((exam) => ({
      ...exam.dataValues,
      noOfStudents,
    }));

    res.json({ examsTotal });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getGradedExams = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { lecturerId, semester } = req.query;
    if (!lecturerId || !semester) {
      res.status(400).json({ message: "All fields are required" });
    }
    const exams = await Exam.findAll({
      where: { lecturerId, semester },
      attributes: ["examId"],
    });

    if (exams.length === 0) {
      res.status(200).json({ studentResult: [] });
      return;
    }

    const examIds = exams.map((exam) => exam.dataValues.examId);

    const gradings = await Grading.findAll({
      where: { examId: examIds },
      include: [{ model: Student, attributes: ["studentId", "matricNo"] }],
    });

    const studentResult = gradings.map((grading) => ({
      ...grading.dataValues,
      matricNo: grading?.dataValues?.student?.matricNo ?? "",
    }));

    res.status(200).json({ studentResult });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
