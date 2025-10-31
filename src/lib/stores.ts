import { writable } from "svelte/store";

export const musicPlayerUrl = writable<string | null>(null);
