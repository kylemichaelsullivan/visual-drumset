import clsx from 'clsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '@/components/Icon';
import { useSounds } from '@/hooks/useSounds';
import type { Dispatch, SetStateAction } from 'react';

type BlinkerProps = {
	bpm: number;
	isRunning: boolean;
	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setPosition: (beat: number, subdivision: number) => void;
};

function Blinker({ bpm, isRunning, setIsRunning, setPosition }: BlinkerProps) {
	const [isLit, setIsLit] = useState(false);
	const [isCountingIn, setIsCountingIn] = useState(false);
	const positionRef = useRef({ beat: 0, subdivision: 0 });
	const countInTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
	const { playMetronomeClick, prepareAudio } = useSounds();

	const flash = useCallback(() => {
		setIsLit(true);
		setTimeout(() => {
			setIsLit(false);
		}, 100);
	}, []);

	const click = useCallback(() => {
		playMetronomeClick();
		flash();
	}, [playMetronomeClick, flash]);

	const clearCountIn = useCallback(() => {
		countInTimersRef.current.forEach(clearTimeout);
		countInTimersRef.current = [];
		setIsCountingIn(false);
	}, []);

	const startCountIn = useCallback(() => {
		clearCountIn();
		setIsCountingIn(true);

		const beatInterval = (60 / bpm) * 1000;

		// Four count-in clicks at the current tempo, then start playback.
		for (let i = 0; i < 4; i++) {
			const timer = setTimeout(() => {
				click();
			}, i * beatInterval);
			countInTimersRef.current.push(timer);
		}

		const startTimer = setTimeout(() => {
			countInTimersRef.current = [];
			setIsCountingIn(false);
			setIsRunning(true);
		}, 4 * beatInterval);
		countInTimersRef.current.push(startTimer);
	}, [bpm, click, clearCountIn, setIsRunning]);

	const handleToggle = useCallback(async () => {
		if (isRunning || isCountingIn) {
			clearCountIn();
			setIsRunning(false);
			return;
		}

		await prepareAudio();
		startCountIn();
	}, [
		isRunning,
		isCountingIn,
		clearCountIn,
		setIsRunning,
		prepareAudio,
		startCountIn,
	]);

	useEffect(() => {
		return () => {
			clearCountIn();
		};
	}, [clearCountIn]);

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
		click();

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
				click();
			}
		}, subdivisionInterval);

		return () => clearInterval(interval);
	}, [isRunning, bpm, click, setPosition]);

	const isActive = isRunning || isCountingIn;

	return (
		<button
			type='button'
			className='Blinker flex justify-center items-center rounded-full w-10 h-10 p-1 hover:ring-1'
			title={isActive ? 'Stop Metronome' : 'Start Metronome'}
			onMouseDown={() => {
				void handleToggle();
			}}
		>
			{isActive ? (
				<div
					className={clsx(
						isLit ? 'bg-green-400' : 'bg-gray-200',
						'rounded-full w-full h-full'
					)}
				/>
			) : (
				<Icon icon='play' filetype='svg' size='sm' />
			)}
		</button>
	);
}

export default Blinker;
