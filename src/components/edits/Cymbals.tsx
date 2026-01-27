import clsx from 'clsx';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useDrums } from '@/hooks/useDrums';
import { getSubdivision } from '@/scripts';
import type { counts } from '@/types/counts';

function Cymbals() {
	const { cymbals, setCymbals } = useDrums();
	const { isDisplaying16ths } = useButtonValues();

	function changeCymbals(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newCymbals: counts = [...cymbals];
		newCymbals[indices[0]][indices[1]] = !newCymbals[indices[0]][indices[1]];

		setCymbals(newCymbals);
	}

	return (
		<div
			className={clsx(
				'Cymbals grid py-4',
				isDisplaying16ths ? 'grid-cols-8 sm:grid-cols-16' : 'grid-cols-8'
			)}
		>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
						className='Cymbal'
						checked={division}
						key={`cymbal-${i}-${getSubdivision(j)}`}
						title={`Cymbal: ${i + 1}${getSubdivision(j)}`}
						id={`cymbal-${i}-${j}`}
						onChange={(e) => changeCymbals(e.target.id)}
					/>
				))
			)}
		</div>
	);
}

export default Cymbals;
