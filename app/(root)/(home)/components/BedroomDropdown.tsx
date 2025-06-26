"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	ChevronDown,
	Cloud,
	CreditCard,
	Github,
	Keyboard,
	LifeBuoy,
	LogOut,
	Mail,
	MessageSquare,
	Plus,
	PlusCircle,
	Settings,
	User,
	UserPlus,
	Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
	bedrooms: z.string().min(2, {
		message: "Minumum must be at least 2 characters.",
	}),
	bathrooms: z.string().min(2, {
		message: "Bathrooms must be at least 2 characters.",
	}),
});

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function BedroomDropdown() {
	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			bedrooms: "",
			bathrooms: "",
		},
	});
	function onSubmit(data: z.infer<typeof FormSchema>) {}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					className="border-none hover:bg-transparent rounded-none border-l"
					variant="outline"
				>
					Bed & Baths <ChevronDown />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-60">
				<DropdownMenuLabel className="text-sm text-gray-600">
					Number of Bedrooms
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-3 px-2 pb-4"
					>
						<FormField
							control={form.control}
							name="bedrooms"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-muted-foreground text-sm">
										Bedrooms
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="1"
											className="h-10"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="bathrooms"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-muted-foreground text-sm">
										Number 0f Bathrooms
									</FormLabel>
									<FormControl>
										<Input
											type="number"
											placeholder="5"
											className="h-10"
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
						<Button size={"md"} type="submit">
							Submit
						</Button>
					</form>
				</Form>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
