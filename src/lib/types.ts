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

export type MusicTrack = {
	title: string;
	artist: string;
	cover?: string;
}

export type Game = {
	name: string;
	playtime_forever: number;
	appid: number;
}

export type WakatimeLanguage = {
	name: string;
	text: string;
	percent: number;
}

export enum STATUS { DONE, DOING, DRAFT };
export type Project = {
	name: string,
	status: STATUS,
	description: string,
	link?: string,
	source?: string
}

export type Projects = {
	[type: string]: {
		[name: string]: Project
	}
}
