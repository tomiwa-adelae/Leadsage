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

export const BasicInformationFormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});

export const PropertyInformationFormSchema = z.object({
	category: z.string().min(2, {
		message: "Category must be at least 2 characters.",
	}),
	address: z.string().min(2, {
		message: "Address must be at least 2 characters.",
	}),
	city: z.string().min(2, {
		message: "City must be at least 2 characters.",
	}),
	state: z.string().min(2, {
		message: "State must be at least 2 characters.",
	}),
});

export const RentDetailsFormSchema = z.object({
	squareMeters: z.string().min(2, {
		message: "The Square meters must be at least 2 characters.",
	}),
	availabilityDate: z.date({
		required_error: "Availability date is required.",
	}),
	description: z.string().min(2, {
		message: "Description must be at least 2 characters.",
	}),
	bedrooms: z.string().min(2, {
		message: "Bedrooms must be at least 2 characters.",
	}),
	bathrooms: z.string().min(2, {
		message: "Bathrooms must be at least 2 characters.",
	}),
});

export const AmenitiesFormSchema = z.object({
	amenities: z
		.array(z.string())
		.refine((value) => value.some((item) => item), {
			message: "You have to select at least 3 amenities.",
		}),
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
