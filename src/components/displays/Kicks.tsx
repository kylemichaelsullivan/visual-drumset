import { useDrums } from '@/context/useDrums';
import { useIsPlaying } from '@/context/useIsPlaying';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import Icon from './Icon';

function Kicks() {
	const { kicks } = useDrums();
	const { currentBeat, currentSubdivision } = useIsPlaying();

	return (
		<div className='Kicks grid grid-cols-8 sm:grid-cols-16'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Kick ${getBackgroundClass(j)} text-center p-2 ${
							i === currentBeat && j === currentSubdivision ? 'active' : ''
						}`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && (
							<Icon
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
