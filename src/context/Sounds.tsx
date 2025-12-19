import { createContext } from 'react';
import type { drums } from '@/types/drums';

export type SoundsContextType = {
	isMuted: boolean;
	playSound: (drum: drums) => void;
	setIsMuted: (value: boolean | ((prev: boolean) => boolean)) => void;
};

export const SoundsContext = createContext<SoundsContextType | undefined>(
	undefined
);
