const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="py-8 bg-white">
			<p className="text-sm font-semibold text-center">
				&copy; {year} Leadsage. All Rights Reserved
			</p>
		</footer>
	);
};

export default Footer;
