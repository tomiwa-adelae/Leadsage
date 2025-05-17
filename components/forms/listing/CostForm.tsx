import { CostFormSchema } from "@/lib/validations";
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

type FormValues = z.infer<typeof CostFormSchema>;

interface PropertyInformationProps {
	nextStep: () => void;
	prevStep: () => void;
	handleChange: (
		input: keyof FormValues
	) => (e: string | React.ChangeEvent<HTMLInputElement>) => void;
	values: FormValues;
}

const CostForm: React.FC<PropertyInformationProps> = ({
	nextStep,
	prevStep,
	handleChange,
	values,
}) => {
	const [loading, setLoading] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(CostFormSchema),
		defaultValues: values, // ✅ Pre-fill values when going back
	});

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
					Set Your Rent & Additional Costs
				</h3>
				<p className="text-base text-muted-foreground">
					Provide details about the rent and any other fees associated
					with your property. Being transparent about costs builds
					trust with potential renters and reduces back-and-forth
					inquiries.
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
						name="rent"
						render={({ field }) => (
							<FormItem className="col-span-2 md:col-span-1">
								<FormLabel>Yearly rent amount</FormLabel>
								<FormControl>
									<Input
										placeholder="e.g., ₦500,000 per year"
										{...field}
										onChange={(e) => {
											field.onChange(e);
											handleChange("rent")(e);
										}}
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
										onChange={(e) => {
											field.onChange(e);
											handleChange("securityDeposit")(e);
										}}
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
										handleChange("rentNegotiable")(value);
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
										<SelectItem value={"Yes"}>
											Yes
										</SelectItem>
										<SelectItem value={"No"}>No</SelectItem>
									</SelectContent>
								</Select>

								<FormMessage />
							</FormItem>
						)}
					/>

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
		</div>
	);
};

export default CostForm;
