import clsx from 'clsx';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useIsPlaying } from '@/hooks/useIsPlaying';
import SkipLink from '../SkipLink';
import BeatDisplay from './BeatDisplay';
import Buttons from './Buttons';

function VisualDisplay() {
	const { isDisplaying16ths } = useButtonValues();
	const { isRunning: isPlaying } = useIsPlaying();

	return (
		<div
			className={clsx(
				'VisualDisplay flex flex-col gap-4 border',
				isPlaying && 'isPlaying',
				!isDisplaying16ths && 'hide-16ths'
			)}
		>
			<Buttons />
			<SkipLink targetSelector='.Metronome' text='Skip to Metronome' />
			<BeatDisplay />
		</div>
	);
}

export default VisualDisplay;
