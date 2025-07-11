import { Document, Schema, model, models, Types } from "mongoose";

const BookingSchema = new Schema(
	{
		listing: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "List",
		},
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{ timestamps: true }
);

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
