declare interface CreateUserParams {
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
	picture: string;
}

declare type AuthenticateUserParams = {
	email: string;
	password: string;
};

declare type CreateListingParams = {
	userId: string;
	details: {
		name: string;
		category: string;
		monthlyPrice: string;
		address: string;
		city: string;
		state: string;
		description: string;
	};
};
