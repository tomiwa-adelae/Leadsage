import { Inknut_Antiqua } from "next/font/google";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Showcase = () => {
	return (
		<div className="py-14">
			<div
				className="rounded-3xl bg-blend-overlay bg-scroll bg-no-repeat bg-cover bg-center h-80"
				style={{
					backgroundImage: `url(/assets/images/about-showcase-bg.jpg)`,
				}}
			>
				<div className="container text-white flex flex-col items-start justify-center h-full gap-4">
					<h1
						className={`text-3xl lg:text-4xl font-bold ${inknut.className}`}
					>
						About
					</h1>
					<p className="text-sm md:text-base leading-relaxed font-medium md:max-w-md">
						Give your visitor a smooth online experience with a
						solid UX design
					</p>
				</div>
			</div>
		</div>
	);
};

export default Showcase;
