import Sidebar from "./components/Sidebar";
import TopNavbar from "./components/TopNavbar";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-gray-100">
			<Sidebar />
			<div className="lg:ml-[300px]">
				<TopNavbar />
				<div className="mt-[70px] md:mt-[87px] container min-h-screen pt-8">
					{children}
				</div>
			</div>
		</div>
	);
}
