import { faCircleDot as faCymbal } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrums } from '@/context/useDrums';
import { getBackgroundClass, getSubdivision } from '@/scripts';

function Cymbals() {
	const { cymbals } = useDrums();

	return (
		<div className='Cymbals grid grid-cols-8 sm:grid-cols-16'>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Cymbal ${getBackgroundClass(
							j
						)} text-yellow-400 text-center py-2`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && <FontAwesomeIcon icon={faCymbal} />}
					</div>
				))
			)}
		</div>
	);
}

export default Cymbals;
