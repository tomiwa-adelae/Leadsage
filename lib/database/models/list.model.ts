import { Document, Schema, model, models, Types } from "mongoose";

// Define TypeScript interface for the Image schema
interface IImage {
	url?: string; // Made optional
	id?: string; // Made optional
}

// Define TypeScript interface for List document
interface IList extends Document {
	user: Types.ObjectId; // Reference to User model
	name: string;
	category?: string;
	rentPrice?: string;
	availabilityDate?: string;
	address?: string;
	city?: string;
	state?: string;
	status?: string;
	images?: IImage[]; // Made optional
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

const imagesSchema = new Schema<IImage>({
	url: {
		type: String,
		required: false, // Made optional
	},
	id: {
		type: String,
		required: false, // Made optional
	},
});

const ListSchema = new Schema<IList>(
	{
		user: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		name: {
			type: String,
			required: true,
		},
		category: String,
		rentPrice: String,
		address: String,
		city: String,
		state: String,
		description: String,
		availabilityDate: String,
		status: {
			type: String,
			default: "pending",
		},
		images: {
			type: [imagesSchema],
			required: false, // Made optional
			default: [], // Ensures it's an empty array if not provided
		},
	},
	{ timestamps: true }
);

const List = models.List || model<IList>("List", ListSchema);

export default List;
