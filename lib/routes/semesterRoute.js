"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const semesterController_1 = require("../controller/semesterController");
const router = express_1.default.Router();
router.post("/", semesterController_1.createSemester);
exports.default = router;
