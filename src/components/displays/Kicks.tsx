import { useDrums } from '@/context/useDrums';
import { getBackgroundClass, getSubdivision } from '@/scripts';
import Icon from './Icon';

function Kicks() {
	const { kicks } = useDrums();

	return (
		<div className='Kicks grid grid-cols-8 sm:grid-cols-16'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<div
						className={`Kick ${getBackgroundClass(j)} text-center p-2`}
						key={`${i}-${getSubdivision(j)}`}
					>
						{division && <Icon icon='bass' />}
					</div>
				))
			)}
		</div>
	);
}

export default Kicks;
