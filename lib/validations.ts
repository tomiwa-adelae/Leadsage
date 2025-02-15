import { z } from "zod";

export const RegisterFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email().min(2, {
		message: "Email must be at least 2 characters.",
	}),
	phoneNumber: z.string().min(2, {
		message: "Phone number must be at least 2 characters.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export const LoginFormSchema = z.object({
	email: z.string().email().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export const CreateListingForm = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	category: z.string().min(2, {
		message: "Category is required.",
	}),
	address: z.string().min(2, {
		message: "Address is required.",
	}),
	city: z.string().min(2, {
		message: "City is required.",
	}),
	state: z.string().min(2, {
		message: "State is required.",
	}),
	availableDate: z.string().min(2, {
		message: "Date for availability is required.",
	}),
	description: z.string().min(2, {
		message: "Description is required.",
	}),
	monthlyPrice: z.string().min(2, {
		message: "Monthly price is required.",
	}),
});
