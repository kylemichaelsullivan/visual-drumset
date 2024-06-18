import type { counts } from '../../types/counts';

import { useDrums } from '../../context/Drums';
import { useSubdivision } from '../../scripts';

function Cymbals() {
	const { cymbals, setCymbals } = useDrums();

	function changeCymbals(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newCymbals: counts = [...cymbals];
		newCymbals[indices[0]][indices[1]] = !newCymbals[indices[0]][indices[1]];

		setCymbals(newCymbals);
	}

	return (
		<div className='Cymbals grid grid-cols-8 py-4 sm:grid-cols-16'>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
						className='Cymbal'
						checked={division}
						key={`cymbal-${i}-${useSubdivision(j)}`}
						title={`Cymbal: ${i + 1}${useSubdivision(j)}`}
						id={`cymbal-${i}-${j}`}
						onChange={(e) => changeCymbals(e.target.id)}
					/>
				))
			)}
		</div>
	);
}

export default Cymbals;
