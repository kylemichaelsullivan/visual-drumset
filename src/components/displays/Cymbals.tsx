import { useDrums } from '@/context/useDrums';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import Icon from './Icon';

function Cymbals() {
	const { cymbals } = useDrums();

	return (
		<div className='Cymbals grid grid-cols-8 sm:grid-cols-16'>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Cymbal ${getBackgroundClass(j)} text-center p-2`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && <Icon icon='cymbal' />}
					</div>
				))
			)}
		</div>
	);
}

export default Cymbals;
