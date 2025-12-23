"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const facultyController_1 = require("../controller/facultyController");
const router = express_1.default.Router();
router.post("/", facultyController_1.createFaculty);
router.get("/", facultyController_1.getFaculties);
exports.default = router;
