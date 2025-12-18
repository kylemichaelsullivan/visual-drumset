import EditBeat from '@/components/edits/EditBeat';
import EditButton from '@/components/edits/EditButton';
import { useEditing } from '@/context/useEditing';
import { useIsPlaying } from '@/context/useIsPlaying';
import Counts from './Counts';
import ShowBeat from './ShowBeat';

function VisualDisplay() {
	const { isEditing } = useEditing();
	const isPlaying = useIsPlaying();

	return (
		<div
			className={`VisualDisplay relative flex flex-col border p-4 pt-8 ${isPlaying ? 'isPlaying' : ''}`}
		>
			<EditButton />
			<Counts />
			{isEditing ? <EditBeat /> : <ShowBeat />}
		</div>
	);
}

export default VisualDisplay;
