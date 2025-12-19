import { createContext, useCallback, useEffect, useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import type { drums } from '@/types/drums';
import { useDrums } from './useDrums';
import { useIsPlaying } from './useIsPlaying';

export type SoundsContextType = {
	playSound: (drum: drums) => void;
};

export const SoundsContext = createContext<SoundsContextType | undefined>(
	undefined
);

type SoundsProviderProps = {
	children: ReactNode;
};

function noise(duration: number, filterFreq: number, ctx: AudioContext): void {
	const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	const src = ctx.createBufferSource();
	src.buffer = buf;
	const filter = ctx.createBiquadFilter();
	filter.type = 'highpass';
	filter.frequency.value = filterFreq;
	src.connect(filter);
	filter.connect(ctx.destination);
	src.start();
}

export function SoundsProvider({ children }: SoundsProviderProps) {
	const audioContextRef = useRef<AudioContext | null>(null);

	const getAudioContext = useCallback(() => {
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext();
		}
		return audioContextRef.current;
	}, []);

	const playSound = useCallback(
		(drum: drums) => {
			try {
				const ctx = getAudioContext();

				// Resume context if suspended (required after user interaction)
				// Don't await - allow multiple sounds to queue up and play simultaneously
				if (ctx.state === 'suspended') {
					ctx.resume().catch(() => {
						// Silently fail if resume fails
					});
				}

				// Each call creates independent audio nodes, allowing simultaneous playback
				if (drum === 'cymbal') {
					noise(0.05, 8000, ctx);
				} else if (drum === 'snare') {
					noise(0.08, 850, ctx);
				} else if (drum === 'bass') {
					const o = ctx.createOscillator();
					const g = ctx.createGain();
					o.type = 'sine';
					o.frequency.value = 110;
					g.gain.setValueAtTime(1, ctx.currentTime);
					g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
					o.connect(g).connect(ctx.destination);
					o.start();
					o.stop(ctx.currentTime + 0.2);
				}
			} catch {
				// Silently handle audio errors
			}
		},
		[getAudioContext]
	);

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

	const value = useMemo(() => ({ playSound }), [playSound]);

	return (
		<SoundsContext.Provider value={value}>
			<BeatPlayer playSound={playSound} />
			{children}
		</SoundsContext.Provider>
	);
}

type BeatPlayerProps = {
	playSound: (drum: drums) => void;
};

function BeatPlayer({ playSound }: BeatPlayerProps) {
	const { cymbals, snares, kicks } = useDrums();
	const { isRunning, currentBeat, currentSubdivision } = useIsPlaying();
	const prevPositionRef = useRef<{ beat: number; subdivision: number } | null>(
		null
	);
	const prevIsRunningRef = useRef<boolean>(false);

	useEffect(() => {
		if (!isRunning) {
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
