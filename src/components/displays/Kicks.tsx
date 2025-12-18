import { faShoePrints as faKick } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrums } from '@/context/useDrums';
import { getBackgroundClass, getSubdivision } from '@/scripts';

function Kicks() {
	const { kicks } = useDrums();

	return (
		<div className='Kicks grid grid-cols-8 sm:grid-cols-16'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Kick ${getBackgroundClass(
							j
						)} text-red-700 text-center py-2`}
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
