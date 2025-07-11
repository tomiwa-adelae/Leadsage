"use client";
import { FinalDetailsFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { AddNewCategoryForm } from "../AddNewCategoryForm";
import { listedBy, states, touringDates } from "@/constant";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { addListingFinalDetails } from "@/lib/actions/list.actions";

type FormValues = z.infer<typeof FinalDetailsFormSchema>;

interface PropertyInformationProps {
	userId: string;
	listingId: string;
	name: string;
	email: string;
	phoneNumber: string;
}

const FinalDetailsForm: React.FC<PropertyInformationProps> = ({
	userId,
	listingId,
	name,
	email,
	phoneNumber,
}) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(FinalDetailsFormSchema),
		defaultValues: {
			fullName: name,
			email,
			phoneNumber,
		},
	});

	async function onSubmit(data: z.infer<typeof FinalDetailsFormSchema>) {
		try {
			const res = await addListingFinalDetails({
				userId,
				listingId,
				...data,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			return router.push(`/create-listing/${res?.listing?._id}/review`);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg mb-1 font-semibold text-primary">
					Who's listing this property for rent?
				</h3>
				<p className="text-base text-muted-foreground">
					Enter your information, unless you're creating the listing
					for someone else and they should be the main contact person.
				</p>
			</div>
			<Form {...form}>
				<form
					// @ts-ignore
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
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
										{listedBy.map((by, index) => (
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
									<PhoneInput
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
					{/* <FormField
						control={form.control}
						name="touringDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Touring dates</FormLabel>
								<div className="flex flex-wrap gap-8">
									{touringDates.map((date) => {
										const selectedValues: string[] =
											field.value || [];

										return (
											<FormField
												key={date.id}
												control={form.control}
												name="touringDate"
												render={() => (
													<FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-2">
														<FormControl>
															<Checkbox
																checked={selectedValues.includes(
																	date.label
																)}
																onCheckedChange={(
																	checked
																) => {
																	const updatedDates =
																		checked
																			? [
																					...selectedValues,
																					date.label,
																			  ]
																			: selectedValues.filter(
																					(
																						value
																					) =>
																						value !==
																						date.label
																			  );

																	field.onChange(
																		updatedDates
																	);
																	handleChange(
																		"touringDate"
																	)(
																		// @ts-ignore
																		updatedDates
																	);
																}}
															/>
														</FormControl>
														<FormLabel className="font-normal">
															{date.label}
														</FormLabel>
													</FormItem>
												)}
											/>
										);
									})}
								</div>
								<FormMessage />
							</FormItem>
						)}
					/> */}
					<div className="flex justify-between mt-6">
						<Button asChild size="lg" variant="outline">
							<Link href={`/create-listing/${listingId}/cost`}>
								Back
							</Link>
						</Button>
						<Button
							disabled={form.formState.isSubmitting}
							size="lg"
							type="submit"
							className="ml-2"
						>
							{form.formState.isSubmitting
								? "Saving..."
								: "Continue"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default FinalDetailsForm;
