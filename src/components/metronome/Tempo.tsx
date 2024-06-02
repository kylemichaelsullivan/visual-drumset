type TempoProps = {
	bpm: number;
	setBpm: React.Dispatch<React.SetStateAction<number>>;
};

function Tempo({ bpm, setBpm }: TempoProps) {
	const min = 40;
	const max = 300;
	const step = 5;

	return (
		<div className='Tempo flex flex-col gap-2 items-center w-full sm:flex-row'>
			<input
				type='range'
				className='cursor-pointer flex-auto'
				min={min}
				max={max}
				step={step}
				title='Set Tempo'
				value={bpm}
				onChange={(e) => setBpm(Number.parseInt(e.target.value))}
			/>
			<input
				type='number'
				className='w-14'
				min={min}
				max={max}
				step={step}
				title='Set Tempo'
				value={bpm}
				onChange={(e) => setBpm(Number.parseInt(e.target.value))}
			/>
		</div>
	);
}

export default Tempo;
