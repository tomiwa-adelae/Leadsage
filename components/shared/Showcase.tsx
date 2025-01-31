import { Inknut_Antiqua } from "next/font/google";

const inknut = Inknut_Antiqua({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
});

const Showcase = ({
	image,
	title,
	description,
}: {
	image: string;
	title: string;
	description: string;
}) => {
	return (
		<div className="py-14">
			<div
				className="rounded-3xl bg-blend-overlay bg-scroll bg-no-repeat bg-cover bg-center h-80"
				style={{
					backgroundImage: `url(${image})`,
				}}
			>
				<div className="container text-white flex flex-col items-start justify-center h-full gap-4">
					<h1
						className={`text-3xl lg:text-4xl font-bold ${inknut.className}`}
					>
						{title}
					</h1>
					<p className="text-sm md:text-base leading-relaxed font-medium md:max-w-md">
						{description}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Showcase;
