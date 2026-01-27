import clsx from 'clsx';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useDrums } from '@/hooks/useDrums';
import { useIsPlaying } from '@/hooks/useIsPlaying';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import DrumIcon from './DrumIcon';

function Kicks() {
	const { kicks } = useDrums();
	const { currentBeat, currentSubdivision } = useIsPlaying();
	const { isDisplaying16ths } = useButtonValues();

	return (
		<div
			className={clsx(
				'Kicks grid',
				isDisplaying16ths ? 'grid-cols-8 sm:grid-cols-16' : 'grid-cols-8'
			)}
		>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<div
						className={clsx(
							'Kick',
							getBackgroundClass(j),
							'text-center py-2',
							i === currentBeat && j === currentSubdivision && 'active'
						)}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && (
							<DrumIcon
								icon='bass'
								isActive={i === currentBeat && j === currentSubdivision}
							/>
						)}
					</div>
				))
			)}
		</div>
	);
}

export default Kicks;
