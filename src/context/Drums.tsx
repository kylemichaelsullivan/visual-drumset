import {
	useState,
	createContext,
	useContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react';

import type { counts } from '../types/counts';

type DrumsContextType = {
	cymbals: counts;
	snares: counts;
	kicks: counts;
	setCymbals: Dispatch<SetStateAction<counts>>;
	setSnares: Dispatch<SetStateAction<counts>>;
	setKicks: Dispatch<SetStateAction<counts>>;
};

const DrumsContext = createContext<DrumsContextType | undefined>(undefined);

type DrumsProviderProps = {
	children: ReactNode;
};

export const DrumsProvider = ({ children }: DrumsProviderProps) => {
	const [cymbals, setCymbals] = useState<counts>([
		[true, false, true, false],
		[true, false, true, false],
		[true, false, true, false],
		[true, false, true, false],
	]);

	const [snares, setSnares] = useState<counts>([
		[false, false, false, false],
		[true, false, false, false],
		[false, false, false, false],
		[true, false, false, false],
	]);

	const [kicks, setKicks] = useState<counts>([
		[true, false, false, false],
		[false, false, false, false],
		[true, false, false, false],
		[false, false, false, false],
	]);

	return (
		<DrumsContext.Provider
			value={{ cymbals, snares, kicks, setCymbals, setSnares, setKicks }}
		>
			{children}
		</DrumsContext.Provider>
	);
};

export const useDrums = (): DrumsContextType => {
	const context = useContext(DrumsContext);
	if (!context) {
		throw new Error('useDrums must be used within a <DrumsProvider />');
	}
	return context;
};
