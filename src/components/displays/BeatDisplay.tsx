import EditBeat from '@/components/edits/EditBeat';
import { useButtonValues } from '@/hooks/useButtonValues';
import Counts from './Counts';
import ShowBeat from './ShowBeat';

function BeatDisplay() {
	const { isEditing } = useButtonValues();

	return (
		<div className='BeatDisplay flex flex-col'>
			<Counts />
			{isEditing ? <EditBeat /> : <ShowBeat />}
		</div>
	);
}

export default BeatDisplay;
