import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BeatPlayer } from './BeatPlayer';
import { SoundsContext } from './Sounds';
import type { ReactNode } from 'react';
import type { drums } from '@/types/drums';

type SoundsProviderProps = {
	children: ReactNode;
};

type NoiseBuffers = {
	cymbal: AudioBuffer | null;
	snare: AudioBuffer | null;
};

function createNoiseBuffer(duration: number, ctx: AudioContext): AudioBuffer {
	const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
	return buf;
}

function playNoise(
	buffer: AudioBuffer,
	filterFreq: number,
	ctx: AudioContext
): void {
	const src = ctx.createBufferSource();
	src.buffer = buffer;
	const filter = ctx.createBiquadFilter();
	filter.type = 'highpass';
	filter.frequency.value = filterFreq;
	src.connect(filter);
	filter.connect(ctx.destination);
	src.start();
}

export function SoundsProvider({ children }: SoundsProviderProps) {
	const audioContextRef = useRef<AudioContext | null>(null);
	const noiseBuffersRef = useRef<NoiseBuffers>({
		cymbal: null,
		snare: null,
	});
	const isInitializedRef = useRef<boolean>(false);
	const isReadyRef = useRef<boolean>(false);
	const [isMuted, setIsMuted] = useState<boolean>(false);

	const getAudioContext = useCallback(() => {
		if (!audioContextRef.current) {
			audioContextRef.current = new AudioContext();
		}
		return audioContextRef.current;
	}, []);

	const initializeNoiseBuffers = useCallback((ctx: AudioContext) => {
		if (!noiseBuffersRef.current.cymbal) {
			noiseBuffersRef.current.cymbal = createNoiseBuffer(0.05, ctx);
		}
		if (!noiseBuffersRef.current.snare) {
			noiseBuffersRef.current.snare = createNoiseBuffer(0.08, ctx);
		}
	}, []);

	// Initialize audio system on mount with a small delay
	useEffect(() => {
		if (isInitializedRef.current) return;

		const initAudio = async () => {
			// Small delay to let the page settle
			await new Promise((resolve) => {
				setTimeout(resolve, 150);
			});

			const ctx = getAudioContext();

			// Try to resume context if suspended (requires user interaction)
			// This will fail silently if no user interaction has occurred yet
			if (ctx.state === 'suspended') {
				try {
					await ctx.resume();
				} catch {
					// Expected to fail on initial load - will resume on first user interaction
				}
			}

			// Pre-initialize buffers
			initializeNoiseBuffers(ctx);

			// Warm up the audio system with actual sounds through the pipeline
			try {
				// Warm up cymbal path
				const buffer1 = noiseBuffersRef.current.cymbal;
				if (buffer1) {
					const src1 = ctx.createBufferSource();
					const filter1 = ctx.createBiquadFilter();
					filter1.type = 'highpass';
					filter1.frequency.value = 8000;
					src1.buffer = buffer1;
					src1.connect(filter1);
					filter1.connect(ctx.destination);
					src1.start();
					src1.stop(ctx.currentTime + 0.001);
				}

				// Warm up snare path
				const buffer2 = noiseBuffersRef.current.snare;
				if (buffer2) {
					const src2 = ctx.createBufferSource();
					const filter2 = ctx.createBiquadFilter();
					filter2.type = 'highpass';
					filter2.frequency.value = 850;
					src2.buffer = buffer2;
					src2.connect(filter2);
					filter2.connect(ctx.destination);
					src2.start();
					src2.stop(ctx.currentTime + 0.001);
				}

				// Warm up bass path
				const o = ctx.createOscillator();
				const g = ctx.createGain();
				g.gain.setValueAtTime(0, ctx.currentTime);
				o.type = 'sine';
				o.frequency.value = 110;
				o.connect(g).connect(ctx.destination);
				o.start();
				o.stop(ctx.currentTime + 0.001);
			} catch {
				// Silently handle warm-up errors
			}

			// Wait a bit more for the audio system to be fully ready
			await new Promise((resolve) => {
				setTimeout(resolve, 50);
			});

			isInitializedRef.current = true;
			isReadyRef.current = true;
		};

		initAudio();
	}, [getAudioContext, initializeNoiseBuffers]);

	const playSoundInternal = useCallback(
		(drum: drums, ctx: AudioContext) => {
			initializeNoiseBuffers(ctx);
			// Each call creates independent audio nodes, allowing simultaneous playback
			if (drum === 'cymbal') {
				const buffer = noiseBuffersRef.current.cymbal;
				if (buffer) {
					playNoise(buffer, 8000, ctx);
				}
			} else if (drum === 'snare') {
				const buffer = noiseBuffersRef.current.snare;
				if (buffer) {
					playNoise(buffer, 850, ctx);
				}
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
		},
		[initializeNoiseBuffers]
	);

	const playSound = useCallback(
		(drum: drums) => {
			if (isMuted) return;

			try {
				const ctx = getAudioContext();

				// If not ready yet, ensure buffers are initialized but add a small delay
				if (!isReadyRef.current) {
					initializeNoiseBuffers(ctx);
					// Add a small delay for the first sound to let the system warm up
					setTimeout(() => {
						if (ctx.state === 'suspended') {
							ctx
								.resume()
								.then(() => {
									playSoundInternal(drum, ctx);
								})
								.catch(() => {
									// Silently fail if resume fails
								});
						} else {
							playSoundInternal(drum, ctx);
						}
					}, 10);
					return;
				}

				// Ensure context is resumed (fire and forget, but queue the sound properly)
				if (ctx.state === 'suspended') {
					ctx
						.resume()
						.then(() => {
							playSoundInternal(drum, ctx);
						})
						.catch(() => {
							// Silently fail if resume fails
						});
					return;
				}

				playSoundInternal(drum, ctx);
			} catch {
				// Silently handle audio errors
			}
		},
		[getAudioContext, initializeNoiseBuffers, playSoundInternal, isMuted]
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

	const value = useMemo(
		() => ({ playSound, isMuted, setIsMuted }),
		[playSound, isMuted]
	);

	return (
		<SoundsContext.Provider value={value}>
			<BeatPlayer playSound={playSound} />
			{children}
		</SoundsContext.Provider>
	);
}
