import { z } from 'zod';
import type { counts } from '@/types/counts';

const countSchema = z.array(z.boolean()).length(4);
const countsSchema = z.array(countSchema).length(4);

export function isBeatValid(cymbals: counts, snares: counts, kicks: counts) {
	let isValid = false;

	try {
		countsSchema.parse(cymbals);
		countsSchema.parse(snares);
		countsSchema.parse(kicks);
		isValid = true;
	} catch (error) {
		alert('Invalid data. Please check the file and try again.');
		console.error(error);
		return;
	}

	return isValid;
}
