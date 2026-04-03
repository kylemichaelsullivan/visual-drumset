import { useCallback, useEffect, useRef } from 'react';
import { useSounds } from '@/hooks/useSounds';
import Button from './Button';

const DOUBLE_TAP_MS = 320;

function MuteButton() {
	const { isMetronomeMuted, isAllMuted, setIsMetronomeMuted, setIsAllMuted } =
		useSounds();

	const isAllMutedRef = useRef(isAllMuted);
	isAllMutedRef.current = isAllMuted;

	const lastPointerDownRef = useRef<number>(0);
	const singleTapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
		null
	);

	useEffect(() => {
		return () => {
			if (singleTapTimeoutRef.current !== null) {
				clearTimeout(singleTapTimeoutRef.current);
			}
		};
	}, []);

	const unmuteEverything = useCallback(() => {
		setIsAllMuted(false);
		setIsMetronomeMuted(false);
	}, [setIsAllMuted, setIsMetronomeMuted]);

	const handlePointerDown = useCallback(() => {
		const now = Date.now();
		const elapsed = now - lastPointerDownRef.current;
		lastPointerDownRef.current = now;

		if (elapsed < DOUBLE_TAP_MS) {
			if (singleTapTimeoutRef.current !== null) {
				clearTimeout(singleTapTimeoutRef.current);
				singleTapTimeoutRef.current = null;
			}
			lastPointerDownRef.current = 0;

			if (isAllMutedRef.current) {
				unmuteEverything();
			} else {
				setIsAllMuted(true);
			}
			return;
		}

		if (singleTapTimeoutRef.current !== null) {
			clearTimeout(singleTapTimeoutRef.current);
		}
		singleTapTimeoutRef.current = setTimeout(() => {
			singleTapTimeoutRef.current = null;
			lastPointerDownRef.current = 0;

			if (isAllMutedRef.current) {
				unmuteEverything();
			} else {
				setIsMetronomeMuted((m) => !m);
			}
		}, DOUBLE_TAP_MS);
	}, [setIsAllMuted, setIsMetronomeMuted, unmuteEverything]);

	let title: string;
	if (isAllMuted) {
		title = 'Tap or double-tap: unmute everything';
	} else if (isMetronomeMuted) {
		title = 'Tap: unmute metronome, Double-tap: mute everything';
	} else {
		title = 'Tap: mute metronome, Double-tap: mute everything';
	}

	let icon: 'full-volume' | 'half-volume' | 'mute';
	if (isAllMuted) {
		icon = 'mute';
	} else if (isMetronomeMuted) {
		icon = 'half-volume';
	} else {
		icon = 'full-volume';
	}

	return (
		<Button
			icon={icon}
			componentName='MuteButton'
			size='md'
			title={title}
			onPointerDown={handlePointerDown}
		/>
	);
}

export default MuteButton;
