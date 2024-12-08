import { getDB } from "../models/index.js";
import { collections } from "../models/printModel.js";

// =======================
// CONFIG CONTROLLER
// =======================

// Update config for a specific file
export const mapConfig = (inputConfig) => {
    const defaultConfig = {
        copy: 1,
        collated: "",
        full: "false",
        range: "",
        "double-side": "false",
        orientation: "portrait",
        "page-size": "a4",
        "page-per-sheet": 1,
        color: "false",
    };
    const mappedConfig = { ...defaultConfig, ...inputConfig };
    return mappedConfig;
};
export const updateConfigForFile = async (req, res) => {
    const { id } = req.params;
    const { config } = req.body;

    try {
        const validatedConfig = mapConfig(config);

        const db = getDB();
        const result = await db
            .collection(collections.orders)
            .updateOne({ _id: id }, { $set: { config: validatedConfig } });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "File not found" });
        }

        res.json({ success: true, message: "Config updated successfully", config: validatedConfig });
    } catch (error) {
        res.status(500).json({ message: "Error updating config", error: error.message });
    }
};

// =======================
// ORDER CONTROLLER
// =======================

export const getOrderById = async (req, res) => {
    const { user_id, printer_id } = req.params;

    try {
        const db = getDB();

        // Define the query object dynamically based on provided params
        const query = {};
        // Print all printers of the user: GET /print/upload/user123
        if (user_id) query.user_id = user_id; 
        // Print all users of the printer: GET /print/upload//printer456
        if (printer_id) query.printer_id = printer_id;

        // Fetch orders matching the query
        const orders = await db.collection(collections.orders).find(query).toArray();

        // Map the results for frontend display
        const mappedOrders = orders.map((order) => {
            const { user_id, printer_id, file, fileSize, config, status } = order;
            return { user_id, printer_id, file, fileSize, config, status };
        });

        res.json(mappedOrders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};


// =======================
// PAYMENT CONTROLLER
// =======================

// Get payments by user_id
export const getPaymentByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const db = getDB();
        const payments = await db.collection(collections.payments).find({ user_id }).toArray();

        const paymentDetails = payments.map((payment) => {
            const { order_id, amount, description, date } = payment;
            return { order_id, amount, description, date };
        });

        res.json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
};

// =======================
// PRINTER CONTROLLER
// =======================

// Get printer by _id
export const getPrinterById = async (req, res) => {
    const { _id } = req.params;
    try {
        const db = getDB();
        const printer = await db.collection(collections.printers).findOne({ _id });

        if (!printer) {
            return res.status(404).json({ message: "Printer not found" });
        }

        const { name, location, status } = printer;
        res.json({ name, location, status });
    } catch (error) {
        res.status(500).json({ message: "Error fetching printer", error: error.message });
    }
};

// =======================
// TOPUP CONTROLLER
// =======================

// Get topups by user_id
export const getTopupByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const db = getDB();
        const topups = await db.collection(collections.topups).find({ user_id }).toArray();

        const topupDetails = topups.map((topup) => {
            const { amount, description, date } = topup;
            return { amount, description, date };
        });

        res.json(topupDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching top-ups", error: error.message });
    }
};

// =======================
// USER CONTROLLER
// =======================

// Get user by user_id
export const getUserById = async (req, res) => {
    const { user_id } = req.params;
    try {
        const db = getDB();
        const user = await db.collection(collections.users).findOne({ _id: user_id });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { username, name, balance } = user;
        res.json({ username, name, balance });
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};


