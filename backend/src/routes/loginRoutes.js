import express from "express";
import { loginUser } from "../controller/loginController.js";

const router = express.Router();

// Login route
router.post("/login", loginUser);

export default router;
