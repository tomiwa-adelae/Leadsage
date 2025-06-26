import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
	publicRoutes: [
		"/",
		"/about",
		"/contact",
		"/apartments",
		"/apartments/:id",
		"/success-booking",
		"/api/webhook/clerk",
	],
	ignoredRoutes: ["/api/webhook/clerk"],
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
