import { faDrum as faSnare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrums } from '@/context/useDrums';
import { getBackgroundClass, getSubdivision } from '@/scripts';

function Snares() {
	const { snares } = useDrums();

	return (
		<div className='Snares grid grid-cols-8 sm:grid-cols-16'>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Snare ${getBackgroundClass(
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
