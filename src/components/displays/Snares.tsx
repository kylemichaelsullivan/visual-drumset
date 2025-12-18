import { useDrums } from '@/context/useDrums';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import Icon from './Icon';

function Snares() {
	const { snares } = useDrums();

	return (
		<div className='Snares grid grid-cols-8 sm:grid-cols-16'>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Snare ${getBackgroundClass(j)} text-center p-2`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && <Icon icon='snare' />}
					</div>
				))
			)}
		</div>
	);
}

export default Snares;
