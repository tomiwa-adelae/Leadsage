// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { Button } from "@/components/ui/button";
// import {
// 	Form,
// 	FormControl,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "../ui/textarea";
// import { Loader2, MoveUpRight } from "lucide-react";
// import { CreateListingFormSchema } from "@/lib/validations";
// import { createList } from "@/lib/actions/list.actions";
// import { useToast } from "@/hooks/use-toast";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { formatMoneyInput, removeCommas } from "@/lib/utils";
// import { getAllCategories } from "@/lib/actions/category.actions";
// import { ICategory } from "@/lib/database/models/category.model";
// import {
// 	Select,
// 	SelectContent,
// 	SelectItem,
// 	SelectTrigger,
// 	SelectValue,
// } from "@/components/ui/select";

// import { AddNewCategoryForm } from "./AddNewCategoryForm";

// export function CreateListingForm({ userId }: { userId: string }) {
// 	const { toast } = useToast();
// 	const router = useRouter();

// 	const [categories, setCategories] = useState<ICategory[]>([]);
// 	const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);

// 	const form = useForm<z.infer<typeof CreateListingFormSchema>>({
// 		resolver: zodResolver(CreateListingFormSchema),
// 		defaultValues: {
// 			name: "",
// 			category: "",
// 			address: "",
// 			city: "",
// 			state: "",
// 			description: "",
// 			rentPrice: "",
// 		},
// 	});

// 	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
// 		if (
// 			event.key === "e" ||
// 			event.key === "E" ||
// 			event.key === "-" ||
// 			event.key === "+"
// 		) {
// 			event.preventDefault();
// 		}
// 	};

// 	const fetchCategories = async () => {
// 		const categoryList = await getAllCategories();

// 		categoryList && setCategories(categoryList as ICategory[]);
// 	};

// 	useEffect(() => {
// 		fetchCategories();
// 	}, []);

// 	async function onSubmit(data: z.infer<typeof CreateListingFormSchema>) {
// 		try {
// 			const details = {
// 				name: data.name,
// 				category: data.category,
// 				address: data.address,
// 				city: data.city,
// 				state: data.state,
// 				description: data.description,
// 				rentPrice: removeCommas(data.rentPrice),
// 			};

// 			const res = await createList({ details, userId });

// 			if (res?.status == 400)
// 				return toast({
// 					title: "Error!",
// 					description: res?.message,
// 					variant: "destructive",
// 				});

// 			toast({
// 				title: "Success!",
// 				description: res?.message,
// 			});

// 			router.push(`/apartments/${res.list?._id}`);
// 		} catch (error) {
// 			toast({
// 				title: "Error!",
// 				description: "An error occurred!",
// 				variant: "destructive",
// 			});
// 		}
// 	}

// 	return (
// 		<div className="bg-white rounded-md p-6 mt-14">
// 			<Form {...form}>
// 				<form
// 					onSubmit={form.handleSubmit(onSubmit)}
// 					className="space-y-6"
// 				>
// 					<FormField
// 						control={form.control}
// 						name="name"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Name</FormLabel>
// 								<FormControl>
// 									<Input
// 										placeholder="Enter the name for the apartment"
// 										{...field}
// 									/>
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 						<FormField
// 							control={form.control}
// 							name="category"
// 							render={({ field }) => (
// 								<div>
// 									<FormItem>
// 										<FormLabel>Category</FormLabel>
// 										<FormControl>
// 											<div className="flex items-center justify-center">
// 												<Select
// 													onValueChange={
// 														field.onChange
// 													}
// 													defaultValue={field.value}
// 												>
// 													<SelectTrigger className="select-field">
// 														<SelectValue placeholder="Select a category" />
// 													</SelectTrigger>
// 													<SelectContent className="pointer-events-auto">
// 														{categories.length >
// 															0 &&
// 															categories.map(
// 																(category) => (
// 																	<SelectItem
// 																		key={
// 																			category._id
// 																		}
// 																		value={
// 																			category._id
// 																		}
// 																		className="select-item p-regular-14"
// 																	>
// 																		{
// 																			category.name
// 																		}
// 																	</SelectItem>
// 																)
// 															)}
// 													</SelectContent>
// 												</Select>
// 												<div
// 													className="flex h-14 uppercase font-semibold cursor-pointer items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-xs"
// 													onClick={() =>
// 														setOpenNewCategory(true)
// 													}
// 												>
// 													Add
// 												</div>
// 											</div>
// 										</FormControl>
// 										<FormMessage />
// 									</FormItem>
// 								</div>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="rentPrice"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>Rent price (yearly)</FormLabel>
// 									<FormControl>
// 										<Input
// 											placeholder="Enter the price for the apartment per month"
// 											{...field}
// 											onChange={(e) => {
// 												let inputValue = e.target.value;
// 												if (
// 													inputValue.startsWith(
// 														"0"
// 													) &&
// 													inputValue.length > 1 &&
// 													inputValue[1] !== "."
// 												) {
// 													inputValue =
// 														inputValue.slice(1);
// 												}

// 												// Prevent the input from starting with a period
// 												if (
// 													inputValue.startsWith(".")
// 												) {
// 													return;
// 												}

// 												inputValue = inputValue.replace(
// 													/[^0-9.]/g,
// 													""
// 												);
// 												const parts =
// 													inputValue.split(".");
// 												if (parts.length > 2) {
// 													inputValue =
// 														parts.shift() +
// 														"." +
// 														parts.join("");
// 												}
// 												if (parts[1]) {
// 													parts[1] =
// 														parts[1].substring(
// 															0,
// 															2
// 														);
// 													inputValue =
// 														parts.join(".");
// 												}
// 												const formattedValue =
// 													formatMoneyInput(
// 														inputValue
// 													);
// 												field.onChange(formattedValue);
// 											}}
// 											onKeyDown={handleKeyDown}
// 										/>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 					</div>
// 					<FormField
// 						control={form.control}
// 						name="address"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Address</FormLabel>
// 								<FormControl>
// 									<Input
// 										placeholder="Enter the address for the apartment"
// 										{...field}
// 									/>
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 						<FormField
// 							control={form.control}
// 							name="city"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>City</FormLabel>
// 									<FormControl>
// 										<Input
// 											placeholder="Enter the city for the apartment"
// 											{...field}
// 										/>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 						<FormField
// 							control={form.control}
// 							name="state"
// 							render={({ field }) => (
// 								<FormItem>
// 									<FormLabel>State</FormLabel>
// 									<FormControl>
// 										<Input
// 											placeholder="Enter the state for the apartment"
// 											{...field}
// 										/>
// 									</FormControl>
// 									<FormMessage />
// 								</FormItem>
// 							)}
// 						/>
// 					</div>
// 					<FormField
// 						control={form.control}
// 						name="description"
// 						render={({ field }) => (
// 							<FormItem>
// 								<FormLabel>Description</FormLabel>
// 								<FormControl>
// 									<Textarea
// 										placeholder="Enter the description of the apartment"
// 										className="resize-none"
// 										{...field}
// 									/>
// 								</FormControl>
// 								<FormMessage />
// 							</FormItem>
// 						)}
// 					/>
// 					<Button
// 						disabled={form.formState.isSubmitting}
// 						size={"lg"}
// 						type="submit"
// 					>
// 						{form.formState.isSubmitting ? (
// 							<>
// 								Saving...{" "}
// 								<Loader2 className="w-4 h-4 animate-spin transition-all" />
// 							</>
// 						) : (
// 							<>
// 								Save <MoveUpRight />
// 							</>
// 						)}
// 					</Button>
// 				</form>
// 			</Form>
// 			{openNewCategory && (
// 				<AddNewCategoryForm
// 					open={openNewCategory}
// 					closeModal={() => {
// 						setOpenNewCategory(false);
// 						fetchCategories();
// 					}}
// 				/>
// 			)}
// 		</div>
// 	);

// // "use client";

// // import { createList } from "@/lib/actions/list.actions";
// // import { CreateListingFormSchema } from "@/lib/validations";
// // import {
// // 	Form,
// // 	FormControl,
// // 	FormField,
// // 	FormItem,
// // 	FormLabel,
// // 	FormMessage,
// // } from "../ui/form";
// // import { Input } from "../ui/input";
// // import { useToast } from "@/hooks/use-toast";
// // import { useRouter } from "next/navigation";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import { Button } from "../ui/button";

// // export const CreateListingForm = ({ userId }: { userId: string }) => {
// // 	const { toast } = useToast();
// // 	const router = useRouter();
// // 	const form = useForm<z.infer<typeof CreateListingFormSchema>>({
// // 		resolver: zodResolver(CreateListingFormSchema),
// // 		defaultValues: {
// // 			name: "",
// // 		},
// // 	});

// // 	async function onSubmit(data: z.infer<typeof CreateListingFormSchema>) {
// // 		try {
// // 			const details = {
// // 				name: data.name,
// // 			};

// // 			const res = await createList({ details, userId });

// // 			if (res?.status == 400)
// // 				return toast({
// // 					title: "Error!",
// // 					description: res?.message,
// // 					variant: "destructive",
// // 				});

// // 			toast({
// // 				title: "Success!",
// // 				description: res?.message,
// // 			});

// // 			router.push(`/apartments/${res.list?._id}`);
// // 		} catch (error) {
// // 			toast({
// // 				title: "Error!",
// // 				description: "An error occurred!",
// // 				variant: "destructive",
// // 			});
// // 		}
// // 	}

// // 	return (
// // 		<div className="bg-white rounded-md p-6 mt-8">
// // 			<Form {...form}>
// // 				<form
// // 					onSubmit={form.handleSubmit(onSubmit)}
// // 					className="space-y-6"
// // 				>
// // 					<FormField
// // 						control={form.control}
// // 						name="name"
// // 						render={({ field }) => (
// // 							<FormItem>
// // 								<FormLabel>Name</FormLabel>
// // 								<FormControl>
// // 									<Input
// // 										placeholder="Enter the name for the apartment"
// // 										{...field}
// // 									/>
// // 								</FormControl>
// // 								<FormMessage />
// // 							</FormItem>
// // 						)}
// // 					/>
// // 					<Button
// // 						disabled={form.formState.isSubmitting}
// // 						size={"lg"}
// // 						type="submit"
// // 					>
// // 						{form.formState.isSubmitting ? "Saving..." : "Save "}
// // 					</Button>
// // 				</form>
// // 			</Form>
// // 		</div>
// // 	);
// // };

"use client";
import React, { useState } from "react";
import BasicInformationForm from "./listing/BasicInformationForm";
import PropertyInformationForm from "./listing/PropertyInformationForm";
import RentDetailsForm from "./listing/RentDetailsForm";
import MediaForm from "./listing/MediaForm";
import AmenitiesForm from "./listing/AmenitiesForm";
import PolicyForm from "./listing/PolicyForm";
import CostForm from "./listing/CostForm";
import FinalDetailsForm from "./listing/FinalDetailsForm";
import ReviewForm from "./listing/ReviewForm";
import { IList } from "@/lib/database/models/list.model";

export const CreateListingForm = ({
	userId,
	listingId,
	steps,
	listing,
}: {
	userId: string;
	listingId?: string;
	steps?: number;
	listing: IList;
}) => {
	console.log(listing);

	const [step, setStep] = useState(Number(steps) || 1);

	const [formData, setFormData] = useState({
		// Basic Information Fields
		name: listing.name || "",
		// Property Information Fields
		category: listing.category || "",
		city: listing.city || "",
		address: listing.address || "",
		state: listing.state || "",

		// Rent details fields
		squareMeters: listing.squareMeters || "",
		availabilityDate: listing.availabilityDate || "",
		description: listing.description || "",
		bedrooms: listing.bedrooms || "",
		bathrooms: listing.bathrooms || "",

		// Media fields
		images: [],

		// Amenities fields
		amenities: [],

		// Policy fields
		petPolicy: listing.petPolicy || "",
		smokingPolicy: listing.smokingPolicy || "",

		// Cost fields
		rent: listing.rent || "",
		securityDeposit: listing.securityDeposit || "",
		rentNegotiable: listing.rentNegotiable || "",

		// Final details fields
		fullName: "",
		email: "",
		phoneNumber: "",
		touringDate: [],
		listedBy: listing.listedBy || "",
	});

	const handleChange =
		(input: keyof typeof formData) =>
		(
			e:
				| string
				| string[]
				| boolean
				| File[]
				| React.ChangeEvent<HTMLInputElement>
				| React.ChangeEvent<HTMLTextAreaElement>
		) => {
			setFormData((prev) => ({
				...prev,
				[input]:
					typeof e === "boolean"
						? e
						: Array.isArray(e) || e instanceof FileList
						? e
						: typeof e === "string"
						? e
						: e.target.value,
			}));
		};

	// ✅ Step navigation handlers
	const nextStep = () => setStep((prev: any) => prev + 1);
	const prevStep = () => setStep((prev: any) => prev - 1);

	return (
		<div className="mt-10">
			{step === 1 && (
				<BasicInformationForm
					nextStep={nextStep}
					handleChange={handleChange}
					values={formData}
					userId={userId}
					listingId={listingId}
				/>
			)}
			{step === 2 && (
				<PropertyInformationForm
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
					values={{
						...formData,
					}}
					userId={userId}
					listingId={listingId}
				/>
			)}
			{step === 3 && (
				<RentDetailsForm
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
					// @ts-ignore
					values={{
						...formData,
					}}
					userId={userId}
					listingId={listingId}
				/>
			)}
			{step === 4 && (
				<MediaForm nextStep={nextStep} prevStep={prevStep} />
			)}
			{step === 5 && (
				<AmenitiesForm
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
					values={{
						...formData,
					}}
				/>
			)}
			{step === 6 && (
				<PolicyForm
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
					values={{
						...formData,
					}}
				/>
			)}
			{step === 7 && (
				<CostForm
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
					values={{
						...formData,
					}}
				/>
			)}
			{step === 8 && (
				<FinalDetailsForm
					nextStep={nextStep}
					prevStep={prevStep}
					handleChange={handleChange}
					values={{
						...formData,
					}}
				/>
			)}
			{step === 9 && (
				<ReviewForm nextStep={nextStep} prevStep={prevStep} />
			)}
		</div>
	);
};
