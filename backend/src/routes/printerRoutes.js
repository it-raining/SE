import express from "express";
import { createPrinterById, getPrinterById } from "../controller/printController.js";

const router = express.Router();

// Routes for creating and fetching printers
router.post("/", createPrinterById);
router.get("/:id", getPrinterById);

export default router;
