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
exports.getFaculties = exports.createFaculty = void 0;
const facultyModel_1 = __importDefault(require("../model/facultyModel"));
const createFaculty = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { facultyName } = req.body;
        if (!facultyName) {
            res.status(400).json({ message: "All fields are required" });
        }
        const faculty = yield facultyModel_1.default.create({ facultyName });
        res.status(200).json(faculty);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createFaculty = createFaculty;
const getFaculties = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faculties = yield facultyModel_1.default.findAll();
        if (faculties.length === 0) {
            res.status(404).json({ message: "No faculty found" });
            return;
        }
        res.status(200).json(faculties);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getFaculties = getFaculties;
