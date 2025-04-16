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
import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";
import { uploadDocuments } from "@/lib/actions/upload.actions";
import { Loader2 } from "lucide-react";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { AddNewCategoryForm } from "../AddNewCategoryForm";
import { states } from "@/constant";

type FormValues = z.infer<typeof PropertyInformationFormSchema>;

interface PropertyInformationProps {
	nextStep: () => void;
	prevStep: () => void;
	handleChange: (
		input: keyof FormValues
	) => (e: string | React.ChangeEvent<HTMLInputElement>) => void;
	values: FormValues;
}

const PropertyInformationForm: React.FC<PropertyInformationProps> = ({
	nextStep,
	prevStep,
	handleChange,
	values,
}) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(PropertyInformationFormSchema),
		defaultValues: values, // ✅ Pre-fill values when going back
	});

	const [categories, setCategories] = useState<ICategory[]>([]);
	const [openNewCategory, setOpenNewCategory] = useState<boolean>(false);

	const fetchCategories = async () => {
		const categoryList = await getAllCategories();

		categoryList && setCategories(categoryList as ICategory[]);
	};

	const onSubmit = form.handleSubmit(
		(data) => {
			nextStep();
		},
		(errors) => {}
	);

	return (
		<div className="py-10 px-6 rounded-md bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
			<div className="mb-6">
				<h3 className="text-lg uppercase mb-1 font-semibold text-primary">
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
								<FormLabel>Category</FormLabel>
								<div className="flex items-center justify-center">
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											handleChange("category")(value);
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
									<Button
										type="button"
										variant={"outline"}
										size={"md"}
										className="rounded-md h-14"
										onClick={() => setOpenNewCategory(true)}
									>
										Add new category
									</Button>
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
								<FormLabel>Street Address</FormLabel>
								<FormControl>
									<Input
										placeholder="Be specific. Include house number, street name, and area if available"
										{...field}
										onChange={(e) => {
											field.onChange(e);
											handleChange("address")(e);
										}}
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
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the city where the property is located"
											{...field}
											onChange={(e) => {
												field.onChange(e);
												handleChange("city")(e);
											}}
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
									<Select
										onValueChange={(value) => {
											field.onChange(value);
											handleChange("state")(value);
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
						<Button size="lg" onClick={prevStep} variant="outline">
							Back
						</Button>
						<Button
							disabled={loading}
							size="lg"
							type="submit"
							className="ml-2"
						>
							{loading ? (
								<>
									<Loader2 className="w-4 h-4 animate-spin transition-all" />
								</>
							) : (
								"Continue"
							)}
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
