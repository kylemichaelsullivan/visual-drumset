import { useDrums } from '../../context/Drums';
import { useBackgroundClass, useSubdivision } from '../../scripts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints as faKick } from '@fortawesome/free-solid-svg-icons';

function Kicks() {
	const { kicks } = useDrums();

	return (
		<div className='Kicks grid grid-cols-8 sm:grid-cols-16'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Kick ${useBackgroundClass(
							j
						)} text-red-700 text-center py-2`}
						key={`${i}-${useSubdivision(j)}`}
					>
						{division && <FontAwesomeIcon icon={faKick} />}
					</div>
				))
			)}
		</div>
	);
}

export default Kicks;
