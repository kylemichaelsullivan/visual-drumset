import clsx from 'clsx';
import Buttons from '@/components/displays/Buttons';
import EditBeat from '@/components/edits/EditBeat';
import { useButtonValues } from '@/hooks/useButtonValues';
import { useIsPlaying } from '@/hooks/useIsPlaying';
import SkipLink from '../SkipLink';
import Counts from './Counts';
import ShowBeat from './ShowBeat';

function VisualDisplay() {
	const { isDisplaying16ths, isEditing } = useButtonValues();
	const { isRunning: isPlaying } = useIsPlaying();

	return (
		<div
			className={clsx(
				'VisualDisplay flex flex-col border',
				isPlaying && 'isPlaying',
				!isDisplaying16ths && 'hide-16ths'
			)}
		>
			<Buttons />
			<SkipLink targetSelector='.Metronome' text='Skip to Metronome' />
			<Counts />
			{isEditing ? <EditBeat /> : <ShowBeat />}
		</div>
	);
}

export default VisualDisplay;
