import { useDrums } from '../../context/Drums';
import { useBackgroundClass, useSubdivision } from '../../scripts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrum as faSnare } from '@fortawesome/free-solid-svg-icons';

function Snares() {
	const { snares } = useDrums();

	return (
		<div className='Snares grid grid-cols-8 sm:grid-cols-16'>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Snare ${useBackgroundClass(
							j,
						)} text-yellow-900 text-center py-2`}
						key={`${i}-${useSubdivision(j)}`}
					>
						{division && <FontAwesomeIcon icon={faSnare} />}
					</div>
				)),
			)}
		</div>
	);
}

export default Snares;
