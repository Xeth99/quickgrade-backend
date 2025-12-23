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
exports.createSemester = void 0;
const semesterModel_1 = __importDefault(require("../model/semesterModel"));
const createSemester = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semester, sessionId } = req.body;
        if (!semester || !sessionId) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const semesterName = yield semesterModel_1.default.create({
            semester,
            sessionId,
        });
        res.status(201).json(semesterName);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create semester" });
    }
});
exports.createSemester = createSemester;
