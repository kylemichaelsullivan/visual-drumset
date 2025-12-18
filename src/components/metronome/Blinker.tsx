import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';

type BlinkerProps = {
	bpm: number;
	isRunning: boolean;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setPosition: (beat: number, subdivision: number) => void;
};

function Blinker({ bpm, isRunning, setIsRunning, setPosition }: BlinkerProps) {
	const [isLit, setIsLit] = useState(false);
	const audioContextRef = useRef<AudioContext | null>(null);
	const positionRef = useRef({ beat: 0, subdivision: 0 });

	const getAudioContext = useCallback(() => {
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext();
		}
		return audioContextRef.current;
	}, []);

	const beep = useCallback(() => {
		try {
			const context = getAudioContext();

			// Resume context if suspended (required after user interaction)
			if (context.state === 'suspended') {
				context.resume().catch(() => {
					// Silently fail if resume fails
				});
			}

			const o = context.createOscillator();
			o.type = 'sine';
			o.frequency.value = 800;
			o.connect(context.destination);
			o.start();
			o.stop(context.currentTime + 0.1);
		} catch (error) {
			// Silently handle audio errors
		}
	}, [getAudioContext]);

	const flash = useCallback(() => {
		setIsLit(true);
		setTimeout(() => {
			setIsLit(false);
		}, 100);
	}, []);

	useEffect(() => {
		return () => {
			// Clean up AudioContext on unmount
			if (audioContextRef.current) {
				audioContextRef.current.close().catch(() => {
					// Silently handle cleanup errors
				});
				audioContextRef.current = null;
			}
		};
	}, []);

	useEffect(() => {
		if (!isRunning) {
			positionRef.current = { beat: 0, subdivision: 0 };
			setPosition(0, 0);
			return;
		}

		const beatInterval = (60 / bpm) * 1000;
		const subdivisionInterval = beatInterval / 4;

		// Reset position when starting
		positionRef.current = { beat: 0, subdivision: 0 };
		setPosition(0, 0);
		beep();
		flash();

		const interval = setInterval(() => {
			positionRef.current.subdivision++;
			if (positionRef.current.subdivision >= 4) {
				positionRef.current.subdivision = 0;
				positionRef.current.beat++;
				if (positionRef.current.beat >= 4) {
					positionRef.current.beat = 0;
				}
			}

			setPosition(positionRef.current.beat, positionRef.current.subdivision);

			if (positionRef.current.subdivision === 0) {
				beep();
				flash();
			}
		}, subdivisionInterval);

		return () => clearInterval(interval);
	}, [isRunning, bpm, beep, flash, setPosition]);

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
