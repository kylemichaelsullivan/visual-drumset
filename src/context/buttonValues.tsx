import { createContext, useEffect, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

export type ButtonValuesContextType = {
	isEditing: boolean;
	isDisplaying16ths: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	setIsDisplaying16ths: Dispatch<SetStateAction<boolean>>;
};

export const ButtonValuesContext = createContext<
	ButtonValuesContextType | undefined
>(undefined);

type ButtonValuesProviderProps = {
	children: ReactNode;
};

export function ButtonValuesProvider({ children }: ButtonValuesProviderProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [isDisplaying16ths, setIsDisplaying16ths] = useState(true);

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
		<ButtonValuesContext.Provider
			value={{
				isEditing,
				setIsEditing,
				isDisplaying16ths,
				setIsDisplaying16ths,
			}}
		>
			{children}
		</ButtonValuesContext.Provider>
	);
}
