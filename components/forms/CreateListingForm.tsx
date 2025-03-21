"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Loader2, LoaderCircle, MoveUpRight } from "lucide-react";
import { CategoryFormSchema, CreateListingFormSchema } from "@/lib/validations";
import { createList } from "@/lib/actions/list.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatMoneyInput, removeCommas } from "@/lib/utils";
import {
	createCategory,
	getAllCategories,
} from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer";

export function CreateListingForm({ userId }: { userId: string }) {
	const { toast } = useToast();
	const router = useRouter();

	const [showUpload, setShowUpload] = useState(false);
	const [newCategory, setNewCategory] = useState("");
	const [categories, setCategories] = useState<ICategory[]>([]);

	const form = useForm<z.infer<typeof CreateListingFormSchema>>({
		resolver: zodResolver(CreateListingFormSchema),
		defaultValues: {
			name: "",
			category: "",
			address: "",
			city: "",
			state: "",
			description: "",
			rentPrice: "",
		},
	});

	const formCategory = useForm<z.infer<typeof CategoryFormSchema>>({
		resolver: zodResolver(CategoryFormSchema),
		defaultValues: {
			name: "",
		},
	});

	useEffect(() => {
		const fetchAllCategories = async () => {
			const categoryList = await getAllCategories();

			categoryList && setCategories(categoryList as ICategory[]);
		};
		fetchAllCategories();
	}, []);

	const handleAddCategory = async () => {
		const newlyAddedCategory = await createCategory({
			name: newCategory.trim(),
		});

		setCategories((prevState) => [...prevState, newlyAddedCategory]);
	};

	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (
			event.key === "e" ||
			event.key === "E" ||
			event.key === "-" ||
			event.key === "+"
		) {
			event.preventDefault();
		}
	};

	async function onSubmit(data: z.infer<typeof CreateListingFormSchema>) {
		try {
			const details = {
				name: data.name,
				category: data.category,
				address: data.address,
				city: data.city,
				state: data.state,
				description: data.description,
				rentPrice: removeCommas(data.rentPrice),
			};

			const res = await createList({ details, userId });

			if (res?.status == 400)
				return toast({
					title: "Error!",
					description: res?.message,
					variant: "destructive",
				});

			toast({
				title: "Success!",
				description: res?.message,
			});

			router.push(`/apartments/${res.list?._id}`);
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
	}

	function onCategorySubmit(data: z.infer<typeof CategoryFormSchema>) {
		createCategory({
			name: data.name,
		}).then((category) => {
			setCategories((prevState) => [...prevState, category]);
			toast({
				title: "Category created successfully!",
			});
		});
	}

	return (
		<div className="bg-white rounded-md p-6 mt-14">
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
								<FormLabel>Name</FormLabel>
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<SelectTrigger className="select-field">
												<SelectValue placeholder="Select a category" />
											</SelectTrigger>
											<SelectContent>
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
																{category.name}
															</SelectItem>
														)
													)}
												<Drawer>
													<DrawerContent>
														<div className="mx-auto w-full sm:max-w-sm lg:max-w-lg py-10 container">
															<h4 className="text-sm uppercase font-medium">
																Create category
															</h4>

															<Form {...form}>
																<form
																	onSubmit={formCategory.handleSubmit(
																		onCategorySubmit
																	)}
																	className="mt-4"
																>
																	<FormField
																		control={
																			form.control
																		}
																		name="name"
																		render={({
																			field,
																		}) => (
																			<FormItem>
																				<FormControl>
																					<Input
																						placeholder="Category name..."
																						{...field}
																					/>
																				</FormControl>
																				<FormMessage />
																			</FormItem>
																		)}
																	/>
																	<div className="flex items-center justify-between gap-4 mt-4 flex-col md:flex-row w-full">
																		<DrawerClose
																			asChild
																		>
																			<Button
																				size="lg"
																				variant="outline"
																				className="w-full md:w-auto"
																			>
																				Cancel
																			</Button>
																		</DrawerClose>
																		<Button
																			size="lg"
																			className="w-full md:w-auto"
																			disabled={
																				form
																					.formState
																					.isSubmitting
																			}
																			type="submit"
																		>
																			{form
																				.formState
																				.isSubmitting
																				? "Adding..."
																				: "Add"}
																		</Button>
																	</div>
																</form>
															</Form>

															{/* Action Buttons */}
														</div>
													</DrawerContent>
												</Drawer>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="rentPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Monthly price</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the price for the apartment per month"
											{...field}
											onChange={(e) => {
												let inputValue = e.target.value;

												// If the input starts with a "0" and is followed by another number, remove the "0"
												if (
													inputValue.startsWith(
														"0"
													) &&
													inputValue.length > 1 &&
													inputValue[1] !== "."
												) {
													inputValue =
														inputValue.slice(1);
												}

												// Prevent the input from starting with a period
												if (
													inputValue.startsWith(".")
												) {
													return;
												}

												inputValue = inputValue.replace(
													/[^0-9.]/g,
													""
												);
												const parts =
													inputValue.split(".");
												if (parts.length > 2) {
													inputValue =
														parts.shift() +
														"." +
														parts.join("");
												}
												if (parts[1]) {
													parts[1] =
														parts[1].substring(
															0,
															2
														);
													inputValue =
														parts.join(".");
												}
												const formattedValue =
													formatMoneyInput(
														inputValue
													);
												field.onChange(formattedValue);
											}}
											onKeyDown={handleKeyDown}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="address"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter the address for the apartment"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the city for the apartment"
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
									<FormLabel>State</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the state for the apartment"
											{...field}
										/>
									</FormControl>
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
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter the description of the apartment"
										className="resize-none"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={form.formState.isSubmitting}
						size={"lg"}
						type="submit"
					>
						{form.formState.isSubmitting ? (
							<>
								Saving...{" "}
								<Loader2 className="w-4 h-4 animate-spin transition-all" />
							</>
						) : (
							<>
								Save <MoveUpRight />
							</>
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
