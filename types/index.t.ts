declare type RegisterUserParams = {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	password: string;
};

declare type AuthenticateUserParams = {
	email: string;
	password: string;
};
