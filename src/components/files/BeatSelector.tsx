import { useState, type SetStateAction } from 'react';

import { useDrums } from '../../context/Drums';

import { isBeatValid } from './Zod';

import BeatSelectorSelect from './BeatSelectorSelect';
import BeatSelectorArrows from './BeatSelectorArrows';
import BeatSelectorApply from './BeatSelectorApply';

import type { BeatSelect } from '../../types/beat';

function BeatSelector() {
	const { setCymbals, setSnares, setKicks } = useDrums();

	const beats: BeatSelect[] = Array.from({ length: 42 }, (_, index) => ({
		value: `beat-${index + 1}.json`,
		label: `Beat ${index + 1}`,
	}));

	const [selectedBeat, setSelectedBeat] = useState(beats[0].value);

	const handleBeatChange = (e: {
		target: { value: SetStateAction<string> };
	}) => {
		setSelectedBeat(e.target.value);
	};

	const handleBeatArrow = async (direction: 'L' | 'R') => {
		const initialIndex = beats.findIndex((beat) => beat.value === selectedBeat);
		const finalIndex =
			direction === 'L'
				? initialIndex > 0
					? initialIndex - 1
					: 0
				: initialIndex < beats.length - 1
					? initialIndex + 1
					: beats.length - 1;
		setSelectedBeat(beats[finalIndex].value);
		await fetchAndApplyBeat(beats[finalIndex].value);
	};

	const applyBeat = async () => {
		if (selectedBeat === 'random') {
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
		<div className='BeatSelector flex gap-2'>
			<div className='flex flex-col flex-auto gap-2'>
				<BeatSelectorSelect
					beats={beats}
					selectedBeat={selectedBeat}
					handleChange={(e) => handleBeatChange(e)}
				/>
				<BeatSelectorArrows handleClick={handleBeatArrow} />
			</div>
			<BeatSelectorApply handleClick={applyBeat} />
		</div>
	);
}

export default BeatSelector;
