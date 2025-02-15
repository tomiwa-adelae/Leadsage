"use server";

import bcrypt from "bcryptjs";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { handleError } from "../utils";

// Create a user
export async function createUser(user: CreateUserParams) {
	try {
		await connectToDatabase();

		const newUser = await User.create(user);

		return JSON.parse(JSON.stringify(newUser));
	} catch (error: any) {
		handleError(error);
	}
}
