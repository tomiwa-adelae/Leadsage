"use server";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

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
