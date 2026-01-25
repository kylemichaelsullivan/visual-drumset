import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import Icon from '@/components/Icon';
import { useIsPlaying } from '@/context/useIsPlaying';
import type { IconType } from '@/types/icon';

type ModifyTempoButtonProps = {
	direction: 'decrease' | 'increase';
};

function ModifyTempoButton({ direction }: ModifyTempoButtonProps) {
	const { decreaseTempo, increaseTempo } = useIsPlaying();
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const handleClick = direction === 'decrease' ? decreaseTempo : increaseTempo;
	const icon: IconType = direction === 'decrease' ? 'minus' : 'add';
	const title = direction === 'decrease' ? 'Decrease Tempo' : 'Increase Tempo';
	const positionX = direction === 'decrease' ? '-left-4' : '-right-4';

	const stopRepeating = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
			timeoutRef.current = null;
		}
	};

	const startRepeating = () => {
		handleClick();

		// Start after a delay
		timeoutRef.current = setTimeout(() => {
			// Keep repeating
			intervalRef.current = setInterval(() => {
				handleClick();
			}, 200);
		}, 500);
	};

	const handleMouseDown = () => {
		startRepeating();
	};

	const handleMouseUp = () => {
		stopRepeating();
	};

	const handleMouseLeave = () => {
		stopRepeating();
	};

	const handleTouchStart = () => {
		startRepeating();
	};

	const handleTouchEnd = () => {
		stopRepeating();
	};

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
		>
			<Icon icon={icon} filetype='svg' size='sm' />
		</button>
	);
}

export default ModifyTempoButton;
