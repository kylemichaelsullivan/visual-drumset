import { createContext, useMemo, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import type { counts } from '@/types/counts';

export type DrumsContextType = {
	cymbals: counts;
	snares: counts;
	kicks: counts;
	setCymbals: Dispatch<SetStateAction<counts>>;
	setSnares: Dispatch<SetStateAction<counts>>;
	setKicks: Dispatch<SetStateAction<counts>>;
};

export const DrumsContext = createContext<DrumsContextType | undefined>(
	undefined
);

type DrumsProviderProps = {
	children: ReactNode;
};

const initialCymbals: counts = [
	[true, false, true, false],
	[true, false, true, false],
	[true, false, true, false],
	[true, false, true, false],
];

const initialSnares: counts = [
	[false, false, false, false],
	[true, false, false, false],
	[false, false, false, false],
	[true, false, false, false],
];

const initialKicks: counts = [
	[true, false, false, false],
	[false, false, false, false],
	[true, false, false, false],
	[false, false, false, false],
];

export function DrumsProvider({ children }: DrumsProviderProps) {
	const [cymbals, setCymbals] = useState<counts>(() => initialCymbals);
	const [snares, setSnares] = useState<counts>(() => initialSnares);
	const [kicks, setKicks] = useState<counts>(() => initialKicks);

	const value = useMemo(
		() => ({ cymbals, snares, kicks, setCymbals, setSnares, setKicks }),
		[cymbals, snares, kicks]
	);

	return (
		<DrumsContext.Provider value={value}>{children}</DrumsContext.Provider>
	);
}
