import type { counts } from '../../types/counts';

import { useDrums } from '../../context/Drums';
import { useSubdivision } from '../../scripts';

function Kicks() {
	const { kicks, setKicks } = useDrums();

	function changeKicks(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newKicks: counts = [...kicks];
		newKicks[indices[0]][indices[1]] = !newKicks[indices[0]][indices[1]];

		setKicks(newKicks);
	}

	return (
		<div className='Kicks grid grid-cols-8 py-4 sm:grid-cols-16'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
						className='Kick'
						checked={division}
						key={`kick-${i}${useSubdivision(j)}`}
						title={`Kick: ${i + 1}${useSubdivision(j)}`}
						id={`kick-${i}-${j}`}
						onChange={(e) => changeKicks(e.target.id)}
					/>
				))
			)}
		</div>
	);
}

export default Kicks;
