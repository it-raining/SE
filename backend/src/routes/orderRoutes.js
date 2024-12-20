import express from "express";
import multer from "multer";
import { createOrderById, getOrderById } from "../controller/printController.js";

const router = express.Router();

// Multer Configuration
let fileName;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    fileName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + "-" + file.originalname.trim();
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Routes

// Routes for creating and fetching orders
router.post("/:user_id/:printer_id", createOrderById);
router.get("/:user_id/:printer_id?", getOrderById);

export default router;
