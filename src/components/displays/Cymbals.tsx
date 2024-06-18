import { useDrums } from '../../context/Drums';
import { useBackgroundClass, useSubdivision } from '../../scripts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot as faCymbal } from '@fortawesome/free-solid-svg-icons';

function Cymbals() {
	const { cymbals } = useDrums();

	return (
		<div className='Cymbals grid grid-cols-8 sm:grid-cols-16'>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Cymbal ${useBackgroundClass(
							j
						)} text-yellow-400 text-center py-2`}
						key={`${i}-${useSubdivision(j)}`}
					>
						{division && <FontAwesomeIcon icon={faCymbal} />}
					</div>
				))
			)}
		</div>
	);
}

export default Cymbals;
