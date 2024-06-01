import type { counts } from '../../types/counts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrum as faSnare } from '@fortawesome/free-solid-svg-icons';

import { getBackgroundClass, getSubdivision } from '../../scripts';

type SnaresProps = {
	snares: counts;
};

function Snares({ snares }: SnaresProps) {
	return (
		<div className='Snares grid grid-cols-16'>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`${getBackgroundClass(
							j
						)} text-yellow-900 text-center py-2`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && <FontAwesomeIcon icon={faSnare} />}
					</div>
				))
			)}
		</div>
	);
}

export default Snares;
