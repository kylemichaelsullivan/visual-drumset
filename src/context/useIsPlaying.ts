import { useContext } from 'react';
import { IsPlayingContext } from './IsPlaying';
import type { IsPlayingContextType } from './IsPlaying';

export const useMetronome = (): IsPlayingContextType => {
	const context = useContext(IsPlayingContext);
	if (!context) {
		throw new Error('useMetronome must be used within a <IsPlayingProvider />');
	}
	return context;
};

export const useIsPlaying = (): boolean => {
	const { isRunning } = useMetronome();
	return isRunning;
};
