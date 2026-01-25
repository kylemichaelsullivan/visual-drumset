import clsx from 'clsx';
import { useDrums } from '@/context/useDrums';
import { useIsPlaying } from '@/context/useIsPlaying';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import DrumIcon from './DrumIcon';

function Snares() {
	const { snares } = useDrums();
	const { currentBeat, currentSubdivision } = useIsPlaying();

	return (
		<div className='Snares grid grid-cols-8 sm:grid-cols-16'>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<div
						className={clsx(
							'Snare',
							getBackgroundClass(j),
							'text-center p-2',
							i === currentBeat && j === currentSubdivision && 'active'
						)}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && (
							<DrumIcon
								icon='snare'
								isActive={i === currentBeat && j === currentSubdivision}
							/>
						)}
					</div>
				))
			)}
		</div>
	);
}

export default Snares;
