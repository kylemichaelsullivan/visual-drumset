import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

type BlinkerProps = {
	bpm: number;
	isRunning: boolean;
	setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
};

function Blinker({ bpm, isRunning, setIsRunning }: BlinkerProps) {
	const [isLit, setIsLit] = useState(false);

	const int = (60 / bpm) * 1000;

	const flash = () => {
		setIsLit(true);
		setTimeout(() => {
			setIsLit(false);
		}, 100);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (isRunning) {
				flash();
			}
		}, int);

		return () => clearInterval(interval);
	}, [isRunning, flash, int]);

	return (
		<button
			type='button'
			className='Blinker flex justify-center items-center rounded-full w-8 h-8 hover:ring-1'
			title={isRunning ? 'Stop Metronome' : 'Start Metronome'}
			onMouseDown={() => setIsRunning(() => !isRunning)}
		>
			{isRunning ? (
				<div
					className={`${
						isLit ? 'bg-green-400' : 'bg-gray-200'
					} rounded-full w-full h-full`}
				/>
			) : (
				<FontAwesomeIcon icon={faPlay} />
			)}
		</button>
	);
}

export default Blinker;
