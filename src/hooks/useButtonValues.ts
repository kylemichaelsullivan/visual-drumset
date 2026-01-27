import { useContext } from 'react';
import { ButtonValuesContext } from '../context/buttonValues';
import type { ButtonValuesContextType } from '../context/buttonValues';

export const useButtonValues = (): ButtonValuesContextType => {
	const context = useContext(ButtonValuesContext);
	if (!context) {
		throw new Error(
			'useButtonValues must be used within a <ButtonValuesProvider />'
		);
	}
	return context;
};
