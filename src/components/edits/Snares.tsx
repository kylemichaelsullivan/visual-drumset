import clsx from 'clsx';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useDrums } from '@/hooks/useDrums';
import { getSubdivision } from '@/scripts';
import type { counts } from '@/types/counts';

function Snares() {
	const { snares, setSnares } = useDrums();
	const { isDisplaying16ths } = useButtonValues();

	function changeSnares(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newSnares: counts = [...snares];
		newSnares[indices[0]][indices[1]] = !newSnares[indices[0]][indices[1]];

		setSnares(newSnares);
	}

	return (
		<div
			className={clsx(
				'Snares grid py-4',
				isDisplaying16ths ? 'grid-cols-8 sm:grid-cols-16' : 'grid-cols-8'
			)}
		>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
						className='Snare'
						checked={division}
						key={`snare-${i}-${getSubdivision(j)}`}
						title={`Snare: ${i + 1}${getSubdivision(j)}`}
						id={`snare-${i}-${j}`}
						onChange={(e) => changeSnares(e.target.id)}
					/>
				))
			)}
		</div>
	);
}

export default Snares;
