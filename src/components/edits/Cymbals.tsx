import type { counts } from '../../types/counts';

import { getSubdivision } from '../../scripts';

type CymbalsProps = {
	cymbals: counts;
	setCymbals: React.Dispatch<React.SetStateAction<counts>>;
};

function Cymbals({ cymbals, setCymbals }: CymbalsProps) {
	function changeCymbals(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newCymbals: counts = [...cymbals];
		newCymbals[indices[0]][indices[1]] = !newCymbals[indices[0]][indices[1]];

		setCymbals(newCymbals);
	}

	return (
		<div className='Cymbals grid grid-cols-16 py-4'>
			{cymbals.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
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
