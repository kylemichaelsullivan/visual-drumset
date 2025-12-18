import { Fragment } from 'react';
import { useIsPlaying } from '@/context/useIsPlaying';

function Counts() {
	const { currentBeat, currentSubdivision } = useIsPlaying();

	return (
		<div className='Counts grid grid-cols-8 border-b sm:grid-cols-16'>
			{Array.from({ length: 4 }, (_, beatIndex) => (
				<Fragment key={`beat-${beatIndex + 1}`}>
					<div
						className={`Count text-center ${
							beatIndex === currentBeat && 0 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-900'
						}`}
					>
						{beatIndex + 1}
					</div>
					<div
						className={`Count text-center ${
							beatIndex === currentBeat && 1 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-300'
						}`}
					>
						e
					</div>
					<div
						className={`Count text-center ${
							beatIndex === currentBeat && 2 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-500'
						}`}
					>
						&
					</div>
					<div
						className={`Count text-center ${
							beatIndex === currentBeat && 3 === currentSubdivision
								? 'text-gray-900 font-bold'
								: 'text-gray-300'
						}`}
					>
						a
					</div>
				</Fragment>
			))}
		</div>
	);
}

export default Counts;
