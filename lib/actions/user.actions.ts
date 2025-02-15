"use server";
import { json } from "stream/consumers";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// Register user
export const createUser = async (user: CreateUserParams) => {
	try {
		await connectToDatabase();

		const newUser = await User.create(user);

		console.log(newUser);

		return JSON.parse(JSON.stringify(newUser));
	} catch (error) {
		handleError(error);
	}
};

// Choose role
export const confirmRole = async (role: string, userId: string) => {
	try {
		await connectToDatabase();

		const user = await User.findById(userId);

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		const isRenter = role === "member" ? false : true;

		user.isRenter = isRenter;

		const updatedRole = await user.save();

		return {
			message: `You have successfully registered as a ${
				user?.isRenter ? "host" : "member"
			}!`,
			data: JSON.parse(JSON.stringify(updatedRole)),
		};
	} catch (error) {
		handleError(error);
	}
};

export const getUserInfo = async (clerkId: string) => {
	try {
		await connectToDatabase();

		const user = await User.findOne({ clerkId });

		if (!user)
			return {
				status: 400,
				message: "Oops! User not found.",
			};

		return JSON.parse(JSON.stringify(user));
	} catch (error: any) {
		handleError(error);
		return {
			status: error?.status || 400,
			message:
				error?.message || "Oops! Couldn't get user! Try again later.",
		};
	}
};
