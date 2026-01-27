import clsx from 'clsx';
import { Fragment } from 'react';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useIsPlaying } from '@/hooks/useIsPlaying';

function Counts() {
	const { currentBeat, currentSubdivision } = useIsPlaying();
	const { isDisplaying16ths } = useButtonValues();

	return (
		<div
			className={clsx(
				'Counts grid border-b',
				isDisplaying16ths ? 'grid-cols-8 sm:grid-cols-16' : 'grid-cols-8'
			)}
		>
			{Array.from({ length: 4 }, (_, beatIndex) => (
				<Fragment key={`beat-${beatIndex + 1}`}>
					<div
						className={clsx(
							'Count text-center',
							beatIndex === currentBeat && 0 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-900'
						)}
					>
						{beatIndex + 1}
					</div>
					<div
						className={clsx(
							'Count text-center',
							beatIndex === currentBeat && 1 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-300'
						)}
					>
						e
					</div>
					<div
						className={clsx(
							'Count text-center',
							beatIndex === currentBeat && 2 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-500'
						)}
					>
						&
					</div>
					<div
						className={clsx(
							'Count text-center',
							beatIndex === currentBeat && 3 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-300'
						)}
					>
						a
					</div>
				</Fragment>
			))}
		</div>
	);
}

export default Counts;
