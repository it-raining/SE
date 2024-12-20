import express from "express";
import bodyParser from "body-parser";
import { connectDB } from "./models/index.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import printerRoutes from "./routes/printerRoutes.js";
import topupRoutes from "./routes/topupRoutes.js";
import loginRoutes from "./routes/loginRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/printers", printerRoutes);
app.use("/api/topups", topupRoutes);
// Use the login routes
app.use("/api/login", loginRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Student Smart Printing Service API");
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred!", error: err.message });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
