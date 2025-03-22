import { z } from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";

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

export const EditUserDetailsSchema = z.object({
	city: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	state: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	address: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	phoneNumber: z
		.string()
		.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
		.refine(isValidPhoneNumber, {
			message: "Invalid phone number",
		}),
});

export const AccountSettingFormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	phoneNumber: z
		.string()
		.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
		.refine(isValidPhoneNumber, {
			message: "Invalid phone number",
		}),
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	gender: z.string().min(2, {
		message: "Gender is required.",
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
});
