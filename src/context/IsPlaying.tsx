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
	decreaseTempo: () => void;
	increaseTempo: () => void;
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

	const min = 40;
	const max = 300;

	const setPosition = useCallback((beat: number, subdivision: number) => {
		setCurrentBeat(beat);
		setCurrentSubdivision(subdivision);
	}, []);

	const roundToNearest5 = useCallback((value: number): number => {
		return Math.round(value / 5) * 5;
	}, []);

	const decreaseTempo = useCallback(() => {
		setBpm((currentBpm) => {
			const rounded = roundToNearest5(currentBpm);
			const newBpm = rounded - 5;
			return Math.max(min, newBpm);
		});
	}, [roundToNearest5]);

	const increaseTempo = useCallback(() => {
		setBpm((currentBpm) => {
			const rounded = roundToNearest5(currentBpm);
			const newBpm = rounded + 5;
			return Math.min(max, newBpm);
		});
	}, [roundToNearest5]);

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
				decreaseTempo,
				increaseTempo,
			}}
		>
			{children}
		</IsPlayingContext.Provider>
	);
}
