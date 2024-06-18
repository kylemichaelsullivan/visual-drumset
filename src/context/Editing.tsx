import {
	useState,
	useEffect,
	createContext,
	useContext,
	type Dispatch,
	type ReactNode,
	type SetStateAction,
} from 'react';

type EditingContextType = {
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
};

const EditingContext = createContext<EditingContextType | undefined>(undefined);

type EditingProviderProps = {
	children: ReactNode;
};

export const EditingProvider = ({ children }: EditingProviderProps) => {
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
};

export const useEditing = (): EditingContextType => {
	const context = useContext(EditingContext);
	if (!context) {
		throw new Error('useEditing must be used within a <EditingProvider />');
	}
	return context;
};
