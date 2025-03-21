import type { counts } from '../../types/counts';

import { useDrums } from '../../context/Drums';
import { useSubdivision } from '../../scripts';

function Snares() {
	const { snares, setSnares } = useDrums();

	function changeSnares(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newSnares: counts = [...snares];
		newSnares[indices[0]][indices[1]] = !newSnares[indices[0]][indices[1]];

		setSnares(newSnares);
	}

	return (
		<div className='Snares grid grid-cols-8 py-4 sm:grid-cols-16'>
			{snares.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
						className='Snare'
						checked={division}
						key={`snare-${i}-${useSubdivision(j)}`}
						title={`Snare: ${i + 1}${useSubdivision(j)}`}
						id={`snare-${i}-${j}`}
						onChange={(e) => changeSnares(e.target.id)}
					/>
				)),
			)}
		</div>
	);
}

export default Snares;
