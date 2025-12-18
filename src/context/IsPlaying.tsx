import { createContext, useCallback, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type IsPlayingContextType = {
	isRunning: boolean;
	bpm: number;
	currentBeat: number;
	currentSubdivision: number;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setBpm: Dispatch<SetStateAction<number>>;
	setPosition: (beat: number, subdivision: number) => void;
};

export const IsPlayingContext = createContext<IsPlayingContextType | undefined>(
	undefined
);

type IsPlayingProviderProps = {
	children: ReactNode;
};

export function IsPlayingProvider({ children }: IsPlayingProviderProps) {
	const [isRunning, setIsRunning] = useState(false);
	const [bpm, setBpm] = useState(120);
	const [currentBeat, setCurrentBeat] = useState(0);
	const [currentSubdivision, setCurrentSubdivision] = useState(0);

	const setPosition = useCallback((beat: number, subdivision: number) => {
		setCurrentBeat(beat);
		setCurrentSubdivision(subdivision);
	}, []);

	return (
		<IsPlayingContext.Provider
			value={{
				isRunning,
				setIsRunning,
				bpm,
				setBpm,
				currentBeat,
				currentSubdivision,
				setPosition,
			}}
		>
			{children}
		</IsPlayingContext.Provider>
	);
}
