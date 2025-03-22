import { getUserInfo } from "@/lib/actions/user.actions";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { userId } = auth();

	if (!userId) {
		redirect("/sign-in"); // Redirect if user is not authenticated
	}

	const user = await getUserInfo(userId!);

	// if (user?.isRenter === undefined) redirect("/choose-account");
	// if (!user?.isRenter) redirect("/not-authorized");

	return (
		<div className="bg-gray-100">
			<Sidebar />
			<div className="lg:ml-[300px]">
				<TopNavbar />
				<div className="min-h-screen pt-8">
					<div className="container">{children}</div>
					<Footer />
				</div>
			</div>
		</div>
	);
}
