import clsx from 'clsx';
import { useCallback, useEffect, useRef } from 'react';
import Icon from '@/components/Icon';
import { useIsPlaying } from '@/hooks/useIsPlaying';
import type { IconType } from '@/types/icon';

type ModifyTempoButtonProps = {
	direction: 'decrease' | 'increase';
};

function ModifyTempoButton({ direction }: ModifyTempoButtonProps) {
	const { decreaseTempo, increaseTempo } = useIsPlaying();
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const handlerRef = useRef<() => void>(() => {});

	// Update the handler ref whenever the direction or handlers change
	handlerRef.current = direction === 'decrease' ? decreaseTempo : increaseTempo;

	const icon: IconType = direction === 'decrease' ? 'minus' : 'add';
	const title = direction === 'decrease' ? 'Decrease Tempo' : 'Increase Tempo';
	const positionX = direction === 'decrease' ? '-left-4' : '-right-4';

	const stopRepeating = useCallback(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	}, []);

	const startRepeating = useCallback(() => {
		stopRepeating();

		// Execute on press
		handlerRef.current();

		// Start repeating after a delay
		timeoutRef.current = setTimeout(() => {
			// Keep repeating at regular intervals
			intervalRef.current = setInterval(() => {
				handlerRef.current();
			}, 200);
		}, 500);
	}, [stopRepeating]);

	const handleMouseDown = useCallback(() => {
		startRepeating();
	}, [startRepeating]);

	const handleMouseUp = useCallback(() => {
		stopRepeating();
	}, [stopRepeating]);

	const handleMouseLeave = useCallback(() => {
		stopRepeating();
	}, [stopRepeating]);

	const handleTouchStart = useCallback(() => {
		startRepeating();
	}, [startRepeating]);

	const handleTouchEnd = useCallback(() => {
		stopRepeating();
	}, [stopRepeating]);

	const handleTouchCancel = useCallback(() => {
		stopRepeating();
	}, [stopRepeating]);

	useEffect(() => {
		return () => {
			stopRepeating();
		};
	}, [stopRepeating]);

	return (
		<button
			type='button'
			className={clsx(
				'ModifyTempoButton absolute flex justify-center items-center bg-gray-100 border border-black w-8 h-8 px-2 py-2 top-1/2',
				positionX,
				'-translate-y-1/2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
			)}
			title={title}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchCancel={handleTouchCancel}
		>
			<Icon icon={icon} filetype='svg' size='sm' />
		</button>
	);
}

export default ModifyTempoButton;
