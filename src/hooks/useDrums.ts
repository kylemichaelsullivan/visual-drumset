import { useContext } from 'react';
import { DrumsContext } from '../context/Drums';
import type { DrumsContextType } from '../context/Drums';

export const useDrums = (): DrumsContextType => {
	const context = useContext(DrumsContext);
	if (!context) {
		throw new Error('useDrums must be used within a <DrumsProvider />');
	}
	return context;
};
