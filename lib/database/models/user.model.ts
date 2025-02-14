import { Document, Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

// Define an interface for the User model
interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	picture?: string;
	password: string;
	isAdmin?: boolean;
	isRenter?: boolean;
	matchPassword(enteredPassword: string): Promise<boolean>;
}

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		picture: {
			type: String,
		},
		password: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
		isRenter: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

// Match user entered password to hashed password in the database
UserSchema.methods.matchPassword = async function (enteredPassword: string) {
	return await bcrypt.compare(enteredPassword, this.password);
};

// Hash new password
UserSchema.pre<IUser>("save", async function (next: any) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(14);
	this.password = await bcrypt.hash(this.password, salt);
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
