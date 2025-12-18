import { createContext, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type IsPlayingContextType = {
	isRunning: boolean;
	bpm: number;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setBpm: Dispatch<SetStateAction<number>>;
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

	return (
		<IsPlayingContext.Provider value={{ isRunning, setIsRunning, bpm, setBpm }}>
			{children}
		</IsPlayingContext.Provider>
	);
}
