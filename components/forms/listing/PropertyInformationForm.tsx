"use client";
import { PropertyInformationFormSchema } from "@/lib/validations";
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
import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { AddNewCategoryForm } from "../AddNewCategoryForm";
import { states } from "@/constant";
import RequiredAsterisk from "@/components/shared/RequiredAsterisk";
import { useToast } from "@/hooks/use-toast";
// import { updateListingDetails } from "@/lib/actions/list.actions";
import { useRouter } from "next/navigation";
import { IList } from "@/lib/database/models/list.model";
import Link from "next/link";
import { addListingPropertyDetails } from "@/lib/actions/list.actions";

type FormValues = z.infer<typeof PropertyInformationFormSchema>;

interface PropertyInformationProps {
	userId: string;
	listingId: string;
	category?: string;
	city?: string;
	address?: string;
	state?: string;
}

const PropertyInformationForm: React.FC<PropertyInformationProps> = ({
	userId,
	listingId,
	city,
	state,
	address,
	category,
}) => {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<FormValues>({
		resolver: zodResolver(PropertyInformationFormSchema),
		defaultValues: {
			city,
			state,
			// @ts-ignore
			category: category?._id || "",
			address,
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

	async function onSubmit(
		data: z.infer<typeof PropertyInformationFormSchema>
	) {
		try {
			const res = await addListingPropertyDetails({
				userId,
				listingId,
				...data,
			});
			if (res.status === 400)
				return toast({ title: res.message, variant: "destructive" });
			toast({
				title: res.message,
			});
			return router.push(
				`/create-listing/${res?.listing?._id}/rent-details`
			);
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
					Where is Your Property Located?
				</h3>
				<p className="text-base text-muted-foreground">
					Help renters find your apartment by providing its accurate
					location details. This ensures it's discoverable in searches
					and maps.
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
											{categories.length === 0 && (
												<p className="italic text-base text-center py-8">
													No categories yet. Add new
													category
												</p>
											)}
											{categories.length > 0 &&
												categories.map((category) => (
													<SelectItem
														key={category._id}
														value={category._id}
														className="select-item p-regular-14"
													>
														{category.name}
													</SelectItem>
												))}
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
											{states.map((state, index): any => (
												<SelectItem
													key={index}
													value={state}
												>
													{state}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex justify-between mt-6">
						<Button asChild size="lg" variant="outline">
							<Link
								href={`/create-listing?listingId=${listingId}`}
							>
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
			{openNewCategory && (
				<AddNewCategoryForm
					open={openNewCategory}
					closeModal={() => {
						setOpenNewCategory(false);
						fetchCategories();
					}}
				/>
			)}
		</div>
	);
};

export default PropertyInformationForm;
