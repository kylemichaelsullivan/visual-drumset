import { useEffect, useRef } from 'react';
import { useDrums } from './useDrums';
import { useEditing } from './useEditing';
import { useIsPlaying } from './useIsPlaying';
import type { drums } from '@/types/drums';

type BeatPlayerProps = {
	playSound: (drum: drums) => void;
};

export function BeatPlayer({ playSound }: BeatPlayerProps) {
	const { cymbals, snares, kicks } = useDrums();
	const { isRunning, currentBeat, currentSubdivision } = useIsPlaying();
	const { isEditing } = useEditing();
	const prevPositionRef = useRef<{ beat: number; subdivision: number } | null>(
		null
	);
	const prevIsRunningRef = useRef<boolean>(false);

	useEffect(() => {
		if (!isRunning || isEditing) {
			prevPositionRef.current = null;
			prevIsRunningRef.current = false;
			return;
		}

		const position = { beat: currentBeat, subdivision: currentSubdivision };

		// Skip if position hasn't actually changed
		if (
			prevPositionRef.current &&
			prevPositionRef.current.beat === position.beat &&
			prevPositionRef.current.subdivision === position.subdivision
		) {
			return;
		}

		// Update tracking
		prevPositionRef.current = position;
		if (!prevIsRunningRef.current) {
			prevIsRunningRef.current = true;
		}

		// Check each drum type and play if there's a hit at this position
		if (cymbals[position.beat]?.[position.subdivision]) {
			playSound('cymbal');
		}
		if (snares[position.beat]?.[position.subdivision]) {
			playSound('snare');
		}
		if (kicks[position.beat]?.[position.subdivision]) {
			playSound('bass');
		}
	}, [
		isEditing,
		isRunning,
		currentBeat,
		currentSubdivision,
		cymbals,
		snares,
		kicks,
		playSound,
	]);

	return null;
}
