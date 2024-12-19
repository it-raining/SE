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
export const createOrderById = async (req, res) => {
    const { user_id, printer_id } = req.params;
    const { name, file, fileSize, config, status } = req.body;

    if (!name || !file || !fileSize || !config || !status) {
        return res.status(400).json({ message: "Name, file, fileSize, config, and status are required" });
    }

    try {
        const db = getDB();
        const result = await db.collection(collections.orders).insertOne({
            _id: new ObjectId().toString(),
            user_id,
            printer_id,
            name,
            file,
            "file-size": fileSize.map((size) => ({ $numberInt: size.toString() })), // Convert file sizes to BSON int
            config: mapConfig(config), // Validate and map config
            status,
        });

        res.status(201).json({ success: true, orderId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

export const getOrderById = async (req, res) => {
    const { user_id, printer_id } = req.params;

    try {
        const db = getDB();
        const query = {};
        // Print all printers of the user: GET /print/upload/user123
        if (user_id) query.user_id = user_id;
        // Print all users of the printer: GET /print/upload//printer456
        if (printer_id) query.printer_id = printer_id;

        const orders = await db.collection(collections.orders).find(query).toArray();
        const mappedOrders = orders.map((order) => ({
            user_id: order.user_id,
            printer_id: order.printer_id,
            file: order.file,
            fileSize: order["file-size"].map((size) => parseInt(size.$numberInt)),
            config: order.config,
            status: order.status,
        }));

        res.json(mappedOrders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};

// =======================
// PAYMENT CONTROLLER
// =======================
export const createPaymentById = async (req, res) => {
    const { user_id } = req.params;
    const { order_id, amount, description } = req.body;

    if (!order_id || !amount || !description) {
        return res.status(400).json({ message: "Order ID, amount, and description are required" });
    }

    try {
        const db = getDB();
        const result = await db.collection(collections.payments).insertOne({
            _id: new ObjectId().toString(),
            user_id,
            order_id,
            amount: { $numberInt: amount.toString() },
            description,
            date: new Date().toISOString(),
        });

        res.status(201).json({ success: true, paymentId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating payment", error: error.message });
    }
};

// Get payments by user_id
export const getPaymentByUserId = async (req, res) => {
    const { user_id } = req.params;

    try {
        const db = getDB();
        const payments = await db.collection(collections.payments).find({ user_id }).toArray();

        const paymentDetails = payments.map((payment) => {
            const { order_id, amount, description, date } = payment;
            return {
                order_id,
                amount: parseInt(amount.$numberInt), // Convert $numberInt to standard number
                description,
                date,
            };
        });

        res.json(paymentDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
};

// =======================
// PRINTER CONTROLLER
// =======================
export const createPrinterById = async (req, res) => {
    const { _id, name, location, status } = req.body;

    if (!_id || !name || !location || !status) {
        return res.status(400).json({ message: "ID, name, location, and status are required" });
    }

    try {
        const db = getDB();
        const result = await db.collection(collections.printers).insertOne({
            _id,
            name,
            location,
            status,
        });

        res.status(201).json({ success: true, printerId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: "Error creating printer", error: error.message });
    }
};

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
export const createTopupById = async (req, res) => {
    const { user_id } = req.params;
    const { amount, description } = req.body;

    if (!amount || !description) {
        return res.status(400).json({ message: "Amount and description are required" });
    }

    try {
        const db = getDB();

        const topupResult = await db.collection(collections.topups).insertOne({
            _id: new ObjectId().toString(),
            user_id,
            amount: { $numberInt: amount.toString() }, // Ensure BSON integer type
            description,
            date: new Date().toISOString(),
        });

        await db.collection(collections.users).updateOne(
            { _id: user_id },
            { $inc: { "balance.$numberInt": parseInt(amount) } } // Adjust user's balance
        );

        res.status(201).json({
            success: true,
            message: "Top-up created successfully",
            topupId: topupResult.insertedId,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating top-up", error: error.message });
    }
};

// Get topups by user_id
export const getTopupByUserId = async (req, res) => {
    const { user_id } = req.params;
    try {
        const db = getDB();
        const topups = await db.collection(collections.topups).find({ user_id }).toArray();
        const topupDetails = topups.map((topup) => {
            const { amount, description, date } = topup;
            return {
                amount: parseInt(amount.$numberInt), // Convert $numberInt to standard number
                description,
                date,
            };
        });
        res.json(topupDetails);
    } catch (error) {
        res.status(500).json({ message: "Error fetching top-ups", error: error.message });
    }
};

