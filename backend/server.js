import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import OrderModel from "./models/OrderSchema.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

function generateOtp() {
	return Math.floor(1000 + Math.random() * 9000).toString();
}

app.post("/order/start", async (req, res) => {
	try {
		const { customerLocation } = req.body;

		const newOrder = new OrderModel({
			customerLocation,
			otp: generateOtp(),
		});

		await newOrder.save();
		res.status(201).json(newOrder);
	} catch (err) {
		res.status(500).json({ error: "Failed to start the order!", details: err });
	}
});

app.get("/order/:orderId", async (req, res) => {
	try {
		const { orderId } = req.params;

		const order = await OrderModel.findOne({ orderId });

		if (!order) return res.status(404).json({ error: "Order not found!" });

		res.status(201).json({
			otp: order.otp,
			isDelivered: order.isDelivered,
			customerLocation: order.customerLocation,
			agentLocation: order.agentLocation,
		});
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch order!", details: err });
	}
});

app.post("/order/verify", async (req, res) => {
	try {
		const { orderId, enteredOtp } = req.body;

		const order = await OrderModel.findOne({ orderId });

		if (!order) return res.status(404).json({ error: "Order not found!" });

		if (order.otp === enteredOtp) {
			order.isDelivered = true;
			order.save();
			return res
				.status(201)
				.json({ success: true, message: "OTP verified. Order delivered." });
		}

		return res.status(401).json({ success: false, message: "Incorrect OTP." });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch order!", details: err });
	}
});

app.post("/location/update", async (req, res) => {
	try {
		const { orderId, agentLocation } = req.body;

		const order = await OrderModel.findOneAndUpdate(
			{ orderId },
			{ agentLocation },
			{ new: true },
		);

		if (!order) return res.status(404).json({ error: "Order not found!" });

		res.status(201).json({ success: true, updated: order });
	} catch (err) {
		res.status(500).json({ error: "Failed to update location!", details: err });
	}
});

app.get("/location/:orderId", async (req, res) => {
	try {
		const { orderId } = req.params;

		const order = await OrderModel.findOne({ orderId });

		if (!order) return res.status(404).json({ error: "Order not found!" });

		res.status(201).json({ agentLocation: order.agentLocation || null });
	} catch (err) {
		res.status(500).json({ error: "Failed to fetch location!", details: err });
	}
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const seedOrder = async () => {
	const existing = await OrderModel.findOne({ orderId: "demo-1234" });
	if (!existing) {
		await OrderModel.create({
			orderId: "demo-1234",
			otp: "5678",
			customerLocation: { lat: 28.6139, lng: 77.209 }, // Delhi
		});
		console.log("Demo order seeded");
	}
};

mongoose
	.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Mongodb is running");
		app.listen(PORT, async () => {
			await seedOrder();
			console.log(`Server is running on PORT ${PORT}`);
		});
	})
	.catch((err) => console.error(err));
