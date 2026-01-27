import clsx from 'clsx';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useDrums } from '@/hooks/useDrums';
import { useIsPlaying } from '@/hooks/useIsPlaying';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import DrumIcon from './DrumIcon';

function Snares() {
	const { snares } = useDrums();
	const { currentBeat, currentSubdivision } = useIsPlaying();
	const { isDisplaying16ths } = useButtonValues();

	return (
		<div
			className={clsx(
				'Snares grid',
				isDisplaying16ths ? 'grid-cols-8 sm:grid-cols-16' : 'grid-cols-8'
			)}
		>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<div
						className={clsx(
							'Snare',
							getBackgroundClass(j),
							'text-center py-2',
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
