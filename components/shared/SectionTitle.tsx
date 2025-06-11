const SectionTitle = ({
	title,
	subTitle,
}: {
	title: string;
	subTitle?: string;
}) => {
	return (
		<div>
			<h1 className="font-medium text-3xl md:text-4xl">{title}</h1>
			<p className="font-medium text-base mt-3">{subTitle}</p>
		</div>
	);
};

export default SectionTitle;
