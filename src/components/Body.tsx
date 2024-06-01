import { useState } from 'react';

import type { counts } from '../types/counts';

import VisualDisplay from './displays/VisualDisplay';
import Metronome from './metronome/Metronome';
import IO from './files/IO';

function Body() {
	const [isEditing, setIsEditing] = useState(false);

	const [cymbals, setCymbals] = useState<counts>([
		[true, false, true, false],
		[true, false, true, false],
		[true, false, true, false],
		[true, false, true, false],
	]);

	const [snares, setSnares] = useState<counts>([
		[false, false, false, false],
		[true, false, false, false],
		[false, false, false, false],
		[true, false, false, false],
	]);

	const [kicks, setKicks] = useState<counts>([
		[true, false, false, false],
		[false, false, false, false],
		[true, false, true, false],
		[false, false, false, false],
	]);

	return (
		<main className='Body flex flex-col justify-between gap-4 p-4'>
			<VisualDisplay
				isEditing={isEditing}
				cymbals={cymbals}
				snares={snares}
				kicks={kicks}
				setIsEditing={setIsEditing}
				setCymbals={setCymbals}
				setSnares={setSnares}
				setKicks={setKicks}
			/>
			<Metronome />
			<IO
				setCymbals={setCymbals}
				setSnares={setSnares}
				setKicks={setKicks}
				beat={{ cymbals: cymbals, snares: snares, kicks: kicks }}
			/>
		</main>
	);
}

export default Body;
