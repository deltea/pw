export type Post = {
	title: string
	slug: string
	date: string
	excerpt: string
	published: boolean
}

export type GuestbookEntry = {
	name?: string;
	timestamp: string;
	website?: string;
	music?: string;
	food?: string;
	message: string;
}

// YouTube API type declarations
declare global {
	interface Window {
		YT: typeof YT;
		onYouTubeIframeAPIReady: () => void;
	}
}

export declare namespace YT {
	export interface Player {
		destroy(): void;
		playVideo(): void;
		pauseVideo(): void;
		getPlayerState(): PlayerState;
		getPlaylist(): string[];
		getPlaylistIndex(): number;
		nextVideo(): void;
		previousVideo(): void;
		playVideoAt(index: number): void;
	}

	export interface PlayerEvent {
		target: Player;
		data: PlayerState;
	}

	export interface PlayerOptions {
		playerVars?: {
			listType?: string;
			list?: string;
		};
		events?: {
			onReady?: (event: PlayerEvent) => void;
			onStateChange?: (event: PlayerEvent) => void;
		};
	}

	export const enum PlayerState {
		UNSTARTED = -1,
		ENDED = 0,
		PLAYING = 1,
		PAUSED = 2,
		BUFFERING = 3,
		CUED = 5
	}

	export class Player {
		constructor(element: HTMLElement, options: PlayerOptions);
	}
}
