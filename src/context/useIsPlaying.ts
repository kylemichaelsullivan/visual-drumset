import { useContext } from 'react';
import { IsPlayingContext } from './IsPlaying';
import type { IsPlayingContextType } from './IsPlaying';

export const useIsPlaying = (): IsPlayingContextType => {
	const context = useContext(IsPlayingContext);
	if (!context) {
		throw new Error('useIsPlaying must be used within a <IsPlayingProvider />');
	}
	return context;
};
