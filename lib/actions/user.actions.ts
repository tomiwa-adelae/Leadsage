"use server";

import bcrypt from "bcryptjs";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// Create a user
export async function createUser(details: RegisterUserParams) {
	try {
		await connectToDatabase();

		if (
			!details.firstName ||
			!details.lastName ||
			!details.email ||
			!details.phoneNumber ||
			!details.password
		)
			return {
				status: 400,
				message:
					"It looks like you missed some details. Please provide all required information.",
			};

		const existed = await User.findOne({ email: details.email });

		if (existed)
			return {
				status: 400,
				message:
					"Oops! This email is already associated with an existing account.",
			};

		const user = await User.create(details);

		console.log(user);

		return {
			message: `Account created successfully! Welcome to LeadSage.`,
			user: JSON.parse(
				JSON.stringify({
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					isAdmin: user.isAdmin,
					isRenter: user.isRenter,
					phoneNumber: user.phoneNumber,
				})
			),
		};
	} catch (error: any) {
		handleError(error);
	}
}

// Authenticate a user
export async function authenticateUser(details: AuthenticateUserParams) {
	try {
		await connectToDatabase();

		if (!details.email || !details.password)
			return {
				status: 400,
				message:
					"It looks like you missed some details. Please provide all required information.",
			};

		const user = await User.findOne({ email: details.email });

		const isPasswordCorrect = await bcrypt.compare(
			details.password,
			user?.password || ""
		);

		if (!user || !isPasswordCorrect)
			return { status: 400, message: "Invalid email or password." };

		return {
			message: `You're in! Welcome back to LeadSage.`,
			user: JSON.parse(
				JSON.stringify({
					_id: user._id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					isAdmin: user.isAdmin,
					isRenter: user.isRenter,
					phoneNumber: user.phoneNumber,
				})
			),
		};
	} catch (error: any) {
		handleError(error);
	}
}
