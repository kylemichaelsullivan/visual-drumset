import type { counts } from '../../types/counts';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoePrints as faKick } from '@fortawesome/free-solid-svg-icons';

import { getBackgroundClass, getSubdivision } from '../../scripts';

type KicksProps = {
	kicks: counts;
};

function Kicks({ kicks }: KicksProps) {
	return (
		<div className='Kicks grid grid-cols-16'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`${getBackgroundClass(j)} text-red-700 text-center py-2`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && <FontAwesomeIcon icon={faKick} />}
					</div>
				))
			)}
		</div>
	);
}

export default Kicks;
