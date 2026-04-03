import { createContext } from 'react';
import type { drums } from '@/types/drums';

export type SoundsContextType = {
	isMetronomeMuted: boolean;
	isAllMuted: boolean;
	playSound: (drum: drums) => void;
	setIsMetronomeMuted: (value: boolean | ((prev: boolean) => boolean)) => void;
	setIsAllMuted: (value: boolean | ((prev: boolean) => boolean)) => void;
};

export const SoundsContext = createContext<SoundsContextType | undefined>(
	undefined
);
