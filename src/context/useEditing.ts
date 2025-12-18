import { useContext } from 'react';
import { EditingContext } from './Editing';
import type { EditingContextType } from './Editing';

export const useEditing = (): EditingContextType => {
	const context = useContext(EditingContext);
	if (!context) {
		throw new Error('useEditing must be used within a <EditingProvider />');
	}
	return context;
};
