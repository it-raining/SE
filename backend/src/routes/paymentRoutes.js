import express from "express";
import { createPaymentById, getPaymentByUserId } from "../controller/printController.js";

const router = express.Router();

// Routes for creating and fetching payments
router.post("/:user_id", createPaymentById);
router.get("/:user_id", getPaymentByUserId);

export default router;
