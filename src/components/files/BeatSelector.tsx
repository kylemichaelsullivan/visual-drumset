import { useState } from 'react';

import { useDrums } from '../../context/Drums';

import { isBeatValid } from './Zod';

function BeatSelector() {
	const { setCymbals, setSnares, setKicks } = useDrums();

	const beats = Array.from({ length: 42 }, (_, index) => ({
		value: `beat-${index + 1}.json`,
		label: `Beat ${index + 1}`,
	}));

	const [selectedBeat, setSelectedBeat] = useState(beats[0].value);

	const handleBeatChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setSelectedBeat(e.target.value);
	};

	const applyBeat = async () => {
		if(selectedBeat === 'random') {
			const randomBeat = Math.floor(Math.random() * 42);
			setSelectedBeat(beats[randomBeat].value);
			await fetchAndApplyBeat(beats[randomBeat].value);
			return;
		}

		try {
			const response = await fetch(`../../../beats/${selectedBeat}`);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const beatJSON = await response.json();
			const { cymbals, snares, kicks } = beatJSON;

			if (!isBeatValid(cymbals, snares, kicks)) {
				return;
			}

			setCymbals(() => cymbals);
			setSnares(() => snares);
			setKicks(() => kicks);
		} catch (error) {
			console.error('Error loading beat data:', error);
		}
	};

	const fetchAndApplyBeat = async (beatValue: string) => {
		const response = await fetch(`../../../beats/${beatValue}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const beatJSON = await response.json();
		const { cymbals, snares, kicks } = beatJSON;

		if (!isBeatValid(cymbals, snares, kicks)) {
			return;
		}

		setCymbals(() => cymbals);
		setSnares(() => snares);
		setKicks(() => kicks);
	};

	return (
		<div className='BeatSelector flex gap-2 items-center'>
			<select
				className='cursor-pointer flex-auto border border-gray-400 p-2 hover:ring-1'
				title='Choose Beat'
				value={selectedBeat}
				onChange={handleBeatChange}
			>
				{beats.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
				<option key='random' value='random'>Random</option>
			</select>

			<button
				type='button'
				className='bg-gray-100 border border-black w-29 px-4 py-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
				title='Apply Beat'
				onMouseDown={applyBeat}
			>
				Apply Beat
			</button>
		</div>
	);
}

export default BeatSelector;
