import express from "express";
import { createTopupById, getTopupByUserId } from "../controller/printController.js";

const router = express.Router();

// Routes for creating and fetching top-ups
router.post("/:user_id", createTopupById);
router.get("/:user_id", getTopupByUserId);

export default router;
