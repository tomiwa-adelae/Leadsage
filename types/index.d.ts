declare interface CreateUserParams {
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
	picture: string;
}

declare interface GetAllListingsParams {
	query: string;
	limit: number;
	page: number;
}

declare interface GetMyListingsParams {
	query: string;
	limit: number;
	page: number;
	userId: string;
}

declare interface SearchParamProps {
	params: { [key: string]: string };
	searchParams: { [key: string]: string | string[] | undefined };
}

declare interface CreateListParams {
	details: any;
	userId: string;
}

declare interface SearchParams {
	id?: string;
}
