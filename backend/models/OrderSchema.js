import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
	{
		orderId: String,
		customerLocation: {
			lat: Number,
			lng: Number,
		},
		agentLocation: {
			lat: Number,
			lng: Number,
		},
		otp: String,
		isDelivered: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true },
);

const OrderModel = mongoose.model("Order", OrderSchema);

export default OrderModel;
