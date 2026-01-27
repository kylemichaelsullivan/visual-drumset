import { useContext } from 'react';
import { SoundsContext } from '../context/Sounds';
import type { SoundsContextType } from '../context/Sounds';

export const useSounds = (): SoundsContextType => {
	const context = useContext(SoundsContext);
	if (!context) {
		throw new Error('useSounds must be used within a <SoundsProvider />');
	}
	return context;
};
