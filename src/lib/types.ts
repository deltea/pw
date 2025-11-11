export type Post = {
	title: string;
	slug: string;
	date: string;
	excerpt: string;
	published: boolean;
	tags?: string[];
}

export type GuestbookEntry = {
	name?: string;
	timestamp: string;
	website?: string;
	music?: string;
	food?: string;
	message: string;
}
