import express from "express";
import { updateConfigForFile } from "../controller/printController.js";

const router = express.Router();

// Route for updating configuration
router.put("/:id/config", updateConfigForFile);

export default router;
