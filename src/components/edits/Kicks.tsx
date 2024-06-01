import type { counts } from '../../types/counts';

import { getSubdivision } from '../../scripts';

type EditBeatProps = {
	kicks: counts;
	setKicks: React.Dispatch<React.SetStateAction<counts>>;
};

function EditBeat({ kicks, setKicks }: EditBeatProps) {
	function changeKicks(id: string) {
		const indices = id.split('-').slice(1).map(Number);
		const newKicks: counts = [...kicks];
		newKicks[indices[0]][indices[1]] = !newKicks[indices[0]][indices[1]];

		setKicks(newKicks);
	}

	return (
		<div className='kicks grid grid-cols-16 py-4'>
			{kicks.map((count, i) =>
				count.map((division, j) => (
					<input
						type='checkbox'
						checked={division}
						key={`kick-${i}${getSubdivision(j)}`}
						title={`Kick: ${i + 1}${getSubdivision(j)}`}
						id={`kick-${i}-${j}`}
						onChange={(e) => changeKicks(e.target.id)}
					/>
				))
			)}
		</div>
	);
}

export default EditBeat;
