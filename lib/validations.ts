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

export const CreateListingFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	category: z.string().optional(),
	address: z.string().optional(),
	city: z.string().optional(),
	state: z.string().optional(),
	description: z.string().optional(),
	rentPrice: z.string().optional(),
});

export const CategoryFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});
