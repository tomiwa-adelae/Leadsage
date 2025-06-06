import { Document, Schema, model, models, Types, Model } from "mongoose";

export interface IImage {
	src?: string;
	imageId?: string;
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
	rent?: string;
	securityDeposit?: string;
	rentNegotiable?: boolean;
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
	listedBy?: string;
	squareMeters?: string;
	amenities?: IAmenity[];
	petPolicy?: boolean;
	smokingPolicy?: boolean;
	touringDate?: ITouringDate[];
	createdAt: Date;
	updatedAt: Date;
}

const ImageSchema = new Schema<IImage>({
	src: { type: String },
	imageId: { type: String },
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
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
		},
		name: {
			type: String,
			required: true,
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
		squareMeters: {
			type: String,
		},
		availabilityDate: {
			type: String,
		},
		description: {
			type: String,
		},
		bedrooms: {
			type: String,
		},
		bathrooms: {
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
		smokingPolicy: {
			type: Boolean,
			default: false,
		},
		rent: {
			type: String,
		},
		rentNegotiable: {
			type: String,
		},
		securityDeposit: {
			type: String,
		},
		touringDate: {
			type: [TouringDateSchema],
			default: [],
		},
		listedBy: {
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
