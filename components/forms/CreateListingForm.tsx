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
import { LoaderCircle, MoveUpRight } from "lucide-react";
import { CreateListingFormSchema } from "@/lib/validations";
import { createList } from "@/lib/actions/list.actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CreateListingForm({ userId }: { userId: string }) {
	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof CreateListingFormSchema>>({
		resolver: zodResolver(CreateListingFormSchema),
		defaultValues: {
			name: "",
			category: "",
			address: "",
			city: "",
			state: "",
			description: "",
			monthlyPrice: "",
		},
	});

	async function onSubmit(data: z.infer<typeof CreateListingFormSchema>) {
		try {
			const res = await createList({ details: { ...data }, userId });

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

			router.push("/listings");
		} catch (error) {
			toast({
				title: "Error!",
				description: "An error occurred!",
				variant: "destructive",
			});
		}
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
										<Input
											placeholder="Enter the category for the apartment"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="monthlyPrice"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Monthly price</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the price for the apartment per month"
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
								Saving <LoaderCircle className="animate-spin" />
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
