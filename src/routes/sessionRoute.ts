import express from "express";
import { createSession } from "../controller/sessionController";

const router = express.Router();

router.post("/", createSession);

export default router;
