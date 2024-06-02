import type { counts } from '../../types/counts';

import { getSubdivision } from '../../scripts';

type SnaresProps = {
	snares: counts;
	setSnares: React.Dispatch<React.SetStateAction<counts>>;
};

function Snares({ snares, setSnares }: SnaresProps) {
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
