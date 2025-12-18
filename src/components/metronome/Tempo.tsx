import type { Dispatch, SetStateAction } from 'react';

type TempoProps = {
	bpm: number;
	setBpm: Dispatch<SetStateAction<number>>;
};

function Tempo({ bpm, setBpm }: TempoProps) {
	const min = 40;
	const max = 300;
	const step = 5;

	return (
		<div className='Tempo flex gap-2 items-center w-full'>
			<input
				type='range'
				className='cursor-pointer flex-auto'
				min={min}
				max={max}
				step={step}
				title='Set Tempo'
				value={bpm}
				onChange={(e) => setBpm(Number.parseInt(e.target.value, 10))}
			/>
			<input
				type='number'
				className='border w-14 p-1'
				min={min}
				max={max}
				step={step}
				title='Set Tempo'
				value={bpm}
				onChange={(e) => setBpm(Number.parseInt(e.target.value, 10))}
			/>
		</div>
	);
}

export default Tempo;
