import type { ChangeEvent } from 'react';

import { BeatSelect } from '../../types/beat';

type BeatSelectorSelectProps = {
	beats: BeatSelect[];
	selectedBeat: string;
	handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

function BeatSelectorSelect({
	beats,
	selectedBeat,
	handleChange,
}: BeatSelectorSelectProps) {
	return (
		<select
			className='BeatSelectorSelect cursor-pointer flex-auto border border-gray-400 rounded-none w-full p-2 hover:ring-1'
			title='Choose Beat'
			value={selectedBeat}
			onChange={handleChange}
		>
			{beats.map((option: BeatSelect) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
			<option key='random' value='random'>
				Random
			</option>
		</select>
	);
}

export default BeatSelectorSelect;
