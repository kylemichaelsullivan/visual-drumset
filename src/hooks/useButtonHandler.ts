import { useCallback } from 'react';
import type { KeyboardEvent } from 'react';

export function useButtonHandler(handler: () => void) {
	const handleClick = useCallback(() => {
		handler();
	}, [handler]);

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				handler();
			}
		},
		[handler]
	);

	return { handleClick, handleKeyDown };
}
