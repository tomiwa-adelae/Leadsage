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
import { LoaderCircle, MoveUpRight } from "lucide-react";
import Link from "next/link";
import { registerUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { RegisterFormSchema } from "@/lib/validations";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export function RegisterForm() {
	const router = useRouter();

	const searchParams = useSearchParams();
	const accountType = searchParams.get("type");

	const [showPassword, setShowPassword] = useState<boolean>();

	const form = useForm<z.infer<typeof RegisterFormSchema>>({
		resolver: zodResolver(RegisterFormSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			phoneNumber: "",
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		const authenticatedUser = localStorage.getItem("user");

		if (authenticatedUser) {
			router.push("/");
		}
	}, [router]);

	async function onSubmit(data: z.infer<typeof RegisterFormSchema>) {
		try {
			// const choice =
			const details = {
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				phoneNumber: data.phoneNumber,
				password: data.password,
				isRenter: accountType === "member" ? false : true,
			};

			const res = await registerUser(details);
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

			// Save user information to database
			localStorage.setItem("user", JSON.stringify(res?.user));

			router.push(res?.user.isRenter ? "/dashboard" : "/");
		} catch (error: any) {
			console.log(error);
		}
	}

	return (
		<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border-green-400 p-12 rounded-xl w-full lg:max-w-lg mx-auto bg-white mt-20">
			<div className="mb-6">
				<h3 className="text-gray-900 font-semibold text-xl leading-normal">
					Let's create your account!
				</h3>
				<p className="text-gray-700 text-sm leading-loose my-4">
					Already have an account?{" "}
					<Link
						className="hover:underline text-green-400 font-medium"
						href="/login"
					>
						Log In!
					</Link>
				</p>
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
											placeholder="Enter your first name"
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
											placeholder="Enter your last name"
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
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter your email"
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
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="flex items-center justify-between gap-2">
									<span>Password</span>
									<span
										onClick={() =>
											setShowPassword(!showPassword)
										}
										className="cursor-pointer text-xs"
									>
										{showPassword
											? "Hide password"
											: "Show password"}
									</span>
								</FormLabel>
								<FormControl>
									<Input
										type={
											showPassword ? "text" : "password"
										}
										placeholder="Enter your password"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={form.formState.isSubmitting}
						className="w-full"
						size={"lg"}
						type="submit"
					>
						{form.formState.isSubmitting
							? "Creating..."
							: "Create account"}{" "}
						{form.formState.isSubmitting ? (
							<LoaderCircle className="animate-spin" />
						) : (
							<MoveUpRight />
						)}
					</Button>
				</form>
			</Form>
		</div>
	);
}
