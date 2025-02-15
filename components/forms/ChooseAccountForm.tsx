import { User } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Separator } from "../ui/separator";

const ChooseAccountForm = () => {
	return (
		<>
			<div className="shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] border-green-400 p-12 rounded-xl w-full lg:max-w-lg mx-auto bg-white mt-20">
				<div>
					<div className="flex items-center justify-start gap-4">
						<div className="rounded-full p-3 bg-green-400 inline-block">
							<User
								absoluteStrokeWidth
								className="w-6 h-6 text-white"
							/>
						</div>
						<h5 className="text-base font-semibold">
							Join as a member
						</h5>
					</div>
					<p className="text-sm leading-loose my-3 text-gray-700">
						As a Leadsage member, you can view and subscribe to
						spaces listed on Leadsage. You can switch this account
						to access host benefits.
					</p>
					<Button size={"md"} className="mt-2" asChild>
						<Link href="/sign-up?type=member">
							Continue as member
						</Link>
					</Button>
				</div>
				<Separator className="my-8" />
				<div>
					<div className="flex items-center justify-start gap-4">
						<div className="rounded-full p-3 bg-blue-400 inline-block">
							<User
								absoluteStrokeWidth
								className="w-6 h-6 text-white"
							/>
						</div>
						<h5 className="text-base font-semibold">
							Join as a host
						</h5>
					</div>
					<p className="text-sm leading-loose my-3 text-gray-700">
						As a Leadsage Host, you can list spaces and earn on
						Leadsage. You can switch this account to access member
						benefits.
					</p>
					<Button
						size={"md"}
						className="mt-2 bg-blue-400 hover:bg-blue-400/90"
						asChild
					>
						<Link href="/sign-up?type=host">Continue as host</Link>
					</Button>
				</div>
			</div>
			<p className="text-gray-400 text-sm text-center mt-6">
				Have an account?{" "}
				<Link href="/sign-in" className="font-semibold text-green-400">
					Log In
				</Link>
			</p>
		</>
	);
};

export default ChooseAccountForm;
