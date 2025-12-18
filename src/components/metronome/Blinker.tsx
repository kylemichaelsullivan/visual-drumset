import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type BlinkerProps = {
	bpm: number;
	isRunning: boolean;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
};

function Blinker({ bpm, isRunning, setIsRunning }: BlinkerProps) {
	const [isLit, setIsLit] = useState(false);

	const int = (60 / bpm) * 1000;

	const beep = useCallback(() => {
		const context = new AudioContext();
		const o = context.createOscillator();
		o.type = 'sine';
		o.connect(context.destination);
		o.start();
		setTimeout(() => {
			o.stop();
		}, 100);
	}, []);

	const flash = useCallback(() => {
		setIsLit(true);
		setTimeout(() => {
			setIsLit(false);
		}, 100);
	}, []);

	const beat = useCallback(() => {
		beep();
		flash();
	}, [beep, flash]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (isRunning) {
				beat();
			}
		}, int);

		return () => clearInterval(interval);
	}, [isRunning, beat, int]);

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
