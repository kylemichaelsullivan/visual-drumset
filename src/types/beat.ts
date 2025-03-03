import type { counts } from './counts';

export type beat = {
	cymbals: counts;
	snares: counts;
	kicks: counts;
};

export type BeatSelect = {
	value: string;
	label: string;
};
