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
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

import { MoveUpRight } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { genders } from "@/constant";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FormSchema = z.object({
	firstName: z.string().min(2, {
		message: "First name must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "Last name must be at least 2 characters.",
	}),
	email: z.string().email().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	phoneNumber: z.string().min(2, {
		message: "Phone number must be at least 2 characters.",
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

export function AccountSettingsForm() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			address: "",
			city: "",
			state: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(data, null, 2)}
					</code>
				</pre>
			),
		});
	}

	return (
		<div className="bg-white rounded-md p-6 mt-14">
			<div className="mt-6 mb-10 relative inline-block">
				<Image
					src={"/assets/images/tomiwa-adelae.jfif"}
					alt={"Profile picture"}
					width={1000}
					height={1000}
					className="w-[150px] h-[150px] object-cover rounded-full"
				/>
				<div className="bg-black/20 rounded-full flex items-center justify-center w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<Image
						src={"/assets/icons/camera.svg"}
						alt={"Camera icon"}
						width={1000}
						height={1000}
						className="w-[20px] h-[20px] "
					/>
				</div>
			</div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-6"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the first name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last name</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the last name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter the email"
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
									<FormLabel>Phone number</FormLabel>
									<FormControl>
										<Input
											placeholder="Enter your phone number"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<FormField
							control={form.control}
							name="gender"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Gender</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl className="capitalize h-14">
											<SelectTrigger>
												<SelectValue placeholder="Select your gender" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{genders.map((gender, index) => (
												<SelectItem
													className="capitalize"
													key={index}
													value={gender}
												>
													{gender}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="dob"
							render={({ field }) => (
								<FormItem className="flex flex-col items-start justify-between">
									<FormLabel>Date of birth</FormLabel>
									<Popover>
										<PopoverTrigger asChild>
											<FormControl>
												<Button
													variant={"outline"}
													className={cn(
														"pl-3 text-left rounded-md h-14 font-normal w-full",
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
														<span>Pick a date</span>
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
												selected={field.value}
												onSelect={field.onChange}
												disabled={(date: any) =>
													date > new Date() ||
													date <
														new Date("1900-01-01")
												}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
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
										placeholder="Enter your address"
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
											placeholder="Enter your city"
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
											placeholder="Enter your state"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button size={"lg"} type="submit">
						Save changes <MoveUpRight />
					</Button>
				</form>
			</Form>
		</div>
	);
}
