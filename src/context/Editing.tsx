import { createContext, useEffect, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type EditingContextType = {
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const EditingContext = createContext<EditingContextType | undefined>(
	undefined
);

type EditingProviderProps = {
	children: ReactNode;
};

export function EditingProvider({ children }: EditingProviderProps) {
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setIsEditing(false);
			}
		};

		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, []);

	return (
		<EditingContext.Provider value={{ isEditing, setIsEditing }}>
			{children}
		</EditingContext.Provider>
	);
}
