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
exports.getDepartments = exports.createDepartment = void 0;
const departmentModel_1 = __importDefault(require("../model/departmentModel"));
const createDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { departmentName, facultyId } = req.body;
        if (!departmentName || !facultyId) {
            res.status(400).json({ message: "All fields are required" });
        }
        const department = yield departmentModel_1.default.create({
            departmentName,
            facultyId,
        });
        res
            .status(200)
            .json({ message: "Department created successfully", data: department });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createDepartment = createDepartment;
const getDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departments = yield departmentModel_1.default.findAll();
        if (departments.length === 0) {
            res.status(404).json({ message: "No department found" });
            return;
        }
        res.status(200).json(departments);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getDepartments = getDepartments;
