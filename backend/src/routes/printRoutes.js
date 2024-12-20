import express from "express";
import multer from "multer";
import {
  getOrders,
  createOrder,
  getPayments,
  createPayment,
  getPrinters,
  updatePrinterStatus,
  getTopups,
  createTopup,
  updateUserBalance,
} from "../controller/printController.js";
import { loginUser } from "../controller/loginController.js";

const router = express.Router();

// =======================
// Multer Configuration for File Uploads
// =======================
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

// =======================
// Routes
// =======================
// Home route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the Print Service Homepage" });
});
router.post("/login", loginUser);

// ORDER Routes
router.post("/print/upload", upload.single("file"), async (req, res) => {
  // Include file information in the request body before calling the controller
  req.body.file = fileName; // Name of the uploaded file
  req.body.fileSize = req.file.size; // Size of the uploaded file
  req.body.status = "pending"; // Default status for new orders
  await createOrder(req, res);
});

// PAYMENT Routes
router.get("/payments", getPayments);
router.post("/payments", createPayment);

// PRINTER Routes
router.get("/print/printer", getPrinters);
router.put("/print/printer/:id/status", updatePrinterStatus);

// TOPUP Routes
router.get("/print/topups", getTopups);
router.post("/print/topups", createTopup);

// USER Routes
router.get("/print/confirm/users", getUsers);
router.put("/print/confirm/users/:id/balance", updateUserBalance);

export default router;
