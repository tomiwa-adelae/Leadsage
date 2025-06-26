"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";
import RequiredAsterisk from "@/components/shared/RequiredAsterisk";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ICategory } from "@/lib/database/models/category.model";
import { getAllCategories } from "@/lib/actions/category.actions";
import { amenities, listedBy as allListing, states } from "@/constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddNewCategoryForm } from "@/components/forms/AddNewCategoryForm";
import "react-phone-number-input/style.css";
import PhoneInputWithCountrySelect, {
	isValidPhoneNumber,
} from "react-phone-number-input";
import { Checkbox } from "@/components/ui/checkbox";
import { updateListingDetails } from "@/lib/actions/list.actions";

const FormSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	category: z
		.string()
		.min(2, {
			message: "Category must be at least 2 characters.",
		})
		.optional(),
	address: z
		.string()
		.min(2, {
			message: "Address must be at least 2 characters.",
		})
		.optional(),
	city: z
		.string()
		.min(2, {
			message: "City must be at least 2 characters.",
		})
		.optional(),
	state: z
		.string()
		.min(2, {
			message: "State must be at least 2 characters.",
		})
		.optional(),
	availabilityDate: z
		.date({
			required_error: "Availability date is required.",
		})
		.optional(),
	description: z
		.string()
		.min(2, {
			message: "Description must be at least 2 characters.",
		})
		.optional(),
	bedrooms: z
		.string({
			required_error: "Number of bedrooms is required.",
		})
		.optional(),
	bathrooms: z
		.string({
			required_error: "Number of bathrooms is required.",
		})
		.optional(),
	amenities: z
		.array(z.string())
		.refine((value) => value.some((item) => item), {
			message: "You have to select at least 3 amenities.",
		})
		.optional(),
	petPolicy: z
		.string()
		.min(2, {
			message: "Pet policy is required.",
		})
		.optional(),
	smokingPolicy: z
		.string()
		.min(2, {
			message: "Smoke policy is required.",
		})
		.optional(),
	rent: z
		.string()
		.min(2, {
			message: "Rent is required.",
		})
		.optional(),
	rentNegotiable: z
		.string()
		.min(2, {
			message: "Negotiation is required.",
		})
		.optional(),
	securityDeposit: z.string().optional(),
	fullName: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.optional(),
	email: z
		.string()
		.email()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.optional(),
	phoneNumber: z
		.string()
		.regex(/^(\+?\d{10,15})$/, { message: "Enter a valid phone number." })
		.refine(isValidPhoneNumber, {
			message: "Invalid phone number",
		})
		.optional(),
	// touringDate: z
	// 	.array(z.string())
	// 	.refine((value) => value.some((item) => item), {
	// 		message: "You have to select at least four subjects.",
	// 	}),
	listedBy: z
		.string()
		.min(2, {
			message: "Negotiation is required.",
		})
		.optional(),
});

export const EditForm = ({
	name,
	category,
	address,
	city,
	state,
	bedrooms,
	bathrooms,
	description,
	rent,
	securityDeposit,
	listingId,
	userId,
	fullName,
	email,
	listedBy,
	phoneNumber,
}: {
	name: string;
	category: string;
	address: string;
	city: string;
	state: string;
	bedrooms: string;
	bathrooms: string;
	description: string;
	rent: string;
	securityDeposit: string;
	listingId: string;
	userId: string;
	fullName: string;
	email: string;
	listedBy: string;
	phoneNumber: string;
}) => {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: name || "",
			category: category || "",
			address: address || "",
			city: city || "",
			state: state || "",
			bedrooms: bedrooms || "",
			bathrooms: bathrooms || "",
			description: description || "",
			rent: rent || "",
			securityDeposit: securityDeposit || "",
			phoneNumber: phoneNumber || "",
			email: email || "",
			fullName: fullName || "",
			listedBy: listedBy || "",
		},
	});

	const [categories, setCategories] = useState<ICategory[]>([]);
	const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);

	const fetchCategories = async () => {
		const categoryList = await getAllCategories();

		categoryList && setCategories(categoryList as ICategory[]);
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		try {
			const details = {
				...data,
			};
			const res = await updateListingDetails({
				userId,
				details,
				listingId,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button size="md">Edit listing</Button>
			</DrawerTrigger>
			<DrawerContent className="h-[90vh]">
				<ScrollArea className="h-[90vh] container">
					<DrawerHeader>
						<DrawerTitle>Edit this listing</DrawerTitle>
					</DrawerHeader>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Name <RequiredAsterisk />
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Enter the name for the apartment"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="category"
								render={({ field }: any) => (
									<FormItem>
										<FormLabel>
											Category <RequiredAsterisk />
										</FormLabel>
										<div className="flex items-center justify-center">
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select your category" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{categories.length ===
														0 && (
														<p className="italic text-base text-center py-8">
															No categories yet.
															Add new category
														</p>
													)}
													{categories.length > 0 &&
														categories.map(
															(category) => (
																<SelectItem
																	key={
																		category._id
																	}
																	value={
																		category._id
																	}
																	className="select-item p-regular-14"
																>
																	{
																		category.name
																	}
																</SelectItem>
															)
														)}
												</SelectContent>
											</Select>
											{/* <Button
										type="button"
										variant={"outline"}
										size={"md"}
										className="rounded-md h-14"
										onClick={() => setOpenNewCategory(true)}
									>
										Add new category
									</Button> */}
										</div>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="address"
								render={({ field }) => (
									<FormItem className="col-span-2 md:col-span-1">
										<FormLabel>
											Street Address <RequiredAsterisk />
										</FormLabel>
										<FormControl>
											<Input
												placeholder="Be specific. Include house number, street name, and area if available"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="city"
									render={({ field }) => (
										<FormItem className="col-span-2 md:col-span-1">
											<FormLabel>
												City <RequiredAsterisk />
											</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter the city where the property is located"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="state"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												State <RequiredAsterisk />
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder=" Select the state that matches the city and address" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{states.map(
														(state, index): any => (
															<SelectItem
																key={index}
																value={state}
															>
																{state}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="availabilityDate"
								render={({ field }) => (
									<FormItem className="flex flex-col">
										<FormLabel>
											Available from <RequiredAsterisk />
										</FormLabel>
										<Popover>
											<PopoverTrigger asChild>
												<FormControl>
													<Button
														variant={"outline"}
														className={cn(
															"w-full rounded-md h-14 justify-start text-base normal-case pl-3 text-left font-medium",
															!field.value &&
																"text-muted-foreground"
														)}
													>
														{field.value ? (
															format(
																field.value,
																"PPP"
															)
														) : (
															<span>
																Pick a date
															</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</FormControl>
											</PopoverTrigger>
											<PopoverContent
												className="w-auto p-0"
												align="start"
											>
												<Calendar
													mode="single"
													// @ts-ignore
													selected={field.value}
													onSelect={field.onChange}
													disabled={(date: any) =>
														date < new Date()
													}
													initialFocus
												/>
											</PopoverContent>
										</Popover>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
								<FormField
									control={form.control}
									name="bedrooms"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Total bedrooms{" "}
												<RequiredAsterisk />
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="How many bedrooms does the apartment have?" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Array.from(
														{ length: 15 },
														(_, index) => (
															<SelectItem
																key={index + 1}
																value={`${
																	index + 1
																}`}
															>
																{index + 1}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="bathrooms"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Total bathrooms{" "}
												<RequiredAsterisk />
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												value={field.value}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="How many bathrooms does the apartment have?" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Array.from(
														{ length: 15 },
														(_, index) => (
															<SelectItem
																key={index + 1}
																value={`${
																	index + 1
																}`}
															>
																{index + 1}
															</SelectItem>
														)
													)}
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Description <RequiredAsterisk />
										</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Include anything you'd want renters to know (e.g., furnishing, nearby landmarks, or rules)."
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="amenities"
								render={({ field }) => (
									<FormItem className="grid gap-4">
										{amenities.map((amenities, index) => (
											<div>
												<FormLabel className="mb-4">
													{amenities.title}{" "}
													{amenities.required && (
														<RequiredAsterisk />
													)}
												</FormLabel>
												<div className="flex flex-wrap gap-8">
													{amenities.amenities.map(
														(amenity) => {
															const selectedValues: string[] =
																field.value ||
																[];

															return (
																<FormField
																	key={
																		amenity.id
																	}
																	control={
																		form.control
																	}
																	name="amenities"
																	render={() => (
																		<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
																			<FormControl>
																				<Checkbox
																					checked={selectedValues.includes(
																						amenity.label
																					)}
																					onCheckedChange={(
																						checked
																					) => {
																						const updatedLaundry =
																							checked
																								? [
																										...selectedValues,
																										amenity.label,
																								  ]
																								: selectedValues.filter(
																										(
																											value
																										) =>
																											value !==
																											amenity.label
																								  );

																						field.onChange(
																							updatedLaundry
																						);
																					}}
																				/>
																			</FormControl>
																			<FormLabel className="font-normal text-base">
																				{
																					amenity.label
																				}
																			</FormLabel>
																		</FormItem>
																	)}
																/>
															);
														}
													)}
												</div>
											</div>
										))}
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<FormField
									control={form.control}
									name="petPolicy"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Are pets allowed?
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select policy" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value={"yes"}>
														Yes
													</SelectItem>
													<SelectItem value={"no"}>
														No
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="smokingPolicy"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Is smoking allowed?
											</FormLabel>
											<Select
												onValueChange={(value) => {
													field.onChange(value);
												}}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Select policy" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value={"yes"}>
														Yes
													</SelectItem>
													<SelectItem value={"no"}>
														No
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="rent"
								render={({ field }) => (
									<FormItem className="col-span-2 md:col-span-1">
										<FormLabel>
											Yearly rent amount
										</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g., ₦500,000 per year"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="securityDeposit"
								render={({ field }) => (
									<FormItem className="col-span-2 md:col-span-1">
										<FormLabel>Security deposit</FormLabel>
										<FormControl>
											<Input
												placeholder="e.g., ₦10,000 per year"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="rentNegotiable"
								render={({ field }: any) => (
									<FormItem>
										<FormLabel>Negotiable rent?</FormLabel>
										<Select
											onValueChange={(value) => {
												field.onChange(value);
											}}
											value={field.value}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select options" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value={"yes"}>
													Yes
												</SelectItem>
												<SelectItem value={"yo"}>
													No
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="listedBy"
								render={({ field }) => (
									<FormItem className="space-y-3">
										<FormLabel>Listed by</FormLabel>
										<FormControl>
											<RadioGroup
												defaultValue={field.value}
												className="flex flex-col space-y-1"
												onValueChange={(value) => {
													field.onChange(value);
												}}
											>
												{allListing.map((by, index) => (
													<FormItem
														key={index}
														className="flex items-center space-x-3 space-y-0"
													>
														<FormControl>
															<RadioGroupItem
																value={by}
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{by}
														</FormLabel>
													</FormItem>
												))}
											</RadioGroup>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="fullName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												disabled
												placeholder="E.g. John Doe"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												disabled
												placeholder="E.g. johndoe@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone Number</FormLabel>
										<FormControl>
											<PhoneInputWithCountrySelect
												placeholder="Enter phone number"
												value={field.value}
												onChange={(phone) => {
													field.onChange(phone);
												}}
												defaultCountry="NG"
												className="flex h-14 w-full rounded-md border border-input bg-background px-3 py-2 text-base sm:text-sm"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								disabled={form.formState.isSubmitting}
								type="submit"
								className="w-full mt-4"
								size={"lg"}
							>
								{form.formState.isSubmitting
									? "Creating..."
									: "Continue"}
							</Button>
						</form>
					</Form>
				</ScrollArea>
			</DrawerContent>
			{openNewCategory && (
				<AddNewCategoryForm
					open={openNewCategory}
					closeModal={() => {
						setOpenNewCategory(false);
						fetchCategories();
					}}
				/>
			)}
		</Drawer>
	);
};
