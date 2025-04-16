import { Document, Schema, model, models, Types, Model } from "mongoose";

export interface IImage {
	url?: string;
	id?: string;
}

export interface IAmenity {
	name: string;
}

export interface ITouringDate {
	date: string;
}

export interface IList extends Document {
	user: Types.ObjectId;
	name: string;
	category?: Types.ObjectId;
	rentPrice?: string;
	availabilityDate?: string;
	address?: string;
	city?: string;
	state?: string;
	status?: string;
	isPublished?: boolean;
	location?: string;
	images?: IImage[];
	description?: string;
	bedrooms?: string;
	bathrooms?: string;
	squareMeters?: string;
	amenities?: IAmenity[];
	petPolicy?: boolean;
	touringDate?: ITouringDate[];
	createdAt: Date;
	updatedAt: Date;
}

const ImageSchema = new Schema<IImage>({
	url: { type: String, required: false },
	id: { type: String, required: false },
});

const AmenitySchema = new Schema<IAmenity>({
	name: { type: String, required: true },
});

const TouringDateSchema = new Schema<ITouringDate>({
	date: { type: String, required: true },
});

// ---------- Main Schema ---------- //

const ListSchema = new Schema<IList>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		rentPrice: {
			type: String,
		},
		address: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		description: {
			type: String,
		},
		availabilityDate: {
			type: String,
		},
		bedrooms: {
			type: String,
		},
		bathrooms: {
			type: String,
		},
		squareMeters: {
			type: String,
		},
		amenities: {
			type: [AmenitySchema],
			default: [],
		},
		petPolicy: {
			type: Boolean,
			default: false,
		},
		touringDate: {
			type: [TouringDateSchema],
			default: [],
		},
		location: {
			type: String,
		},
		status: {
			type: String,
			default: "pending",
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		images: {
			type: [ImageSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

// ---------- Model ---------- //

const List: Model<IList> = models.List || model<IList>("List", ListSchema);
export default List;
