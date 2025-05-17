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
import { BasicInformationFormSchema } from "@/lib/validations";
import RequiredAsterisk from "@/components/shared/RequiredAsterisk";
import { createList, updateListingDetails } from "@/lib/actions/list.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type FormValues = z.infer<typeof BasicInformationFormSchema>;

interface BasicInformationFormProps {
	userId: string;
	listingId?: string;
	nextStep: () => void;
	handleChange: (
		input: keyof FormValues
	) => (e: string | React.ChangeEvent<HTMLInputElement>) => void;
	values: FormValues;
}

const BasicInformationForm: React.FC<BasicInformationFormProps> = ({
	nextStep,
	handleChange,
	values,
	userId,
	listingId,
}) => {
	const { toast } = useToast();
	const router = useRouter();
	const form = useForm<FormValues>({
		resolver: zodResolver(BasicInformationFormSchema),
		defaultValues: values,
	});

	async function onSubmit(data: z.infer<typeof BasicInformationFormSchema>) {
		try {
			const details = {
				...data,
			};

			let res;

			if (listingId) {
				res = await updateListingDetails({
					details,
					userId,
					listingId,
				});
			} else {
				res = await createList({ details, userId });
			}
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

			nextStep();

			router.push(`/create-listing?id=${res.list?._id}&steps=${2}`);
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
				<h3 className="text-lg uppercase mb-1 font-semibold text-primary">
					Let’s Start With the Basics
				</h3>
				<p className="text-base text-muted-foreground">
					Give us a quick overview of your apartment. This helps
					renters know what kind of space you’re offering at a glance.
				</p>
			</div>
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
										onChange={(e) => {
											field.onChange(e);
											handleChange("name")(e);
										}}
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
							? listingId
								? "Changing..."
								: "Saving..."
							: "Continue"}
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default BasicInformationForm;
