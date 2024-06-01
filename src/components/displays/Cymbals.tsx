import type { counts } from '../../types/counts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot as faCymbal } from '@fortawesome/free-solid-svg-icons';

import { getBackgroundClass, getSubdivision } from '../../scripts';

type CymbalsProps = {
	cymbals: counts;
};

function Cymbals({ cymbals }: CymbalsProps) {
	return (
		<div className='Cymbals grid grid-cols-16'>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`${getBackgroundClass(
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
