import EditButton from '../edits/EditButton';
import Counts from './Counts';
import ShowBeat from './ShowBeat';
import EditBeat from '../edits/EditBeat';
import { useEditing } from '../../context/Editing';

function VisualDisplay() {
	const { isEditing } = useEditing();

	return (
		<div className='VisualDisplay relative flex flex-col border p-4 pt-8'>
			<EditButton />
			<Counts />
			{isEditing ? <EditBeat /> : <ShowBeat />}
		</div>
	);
}

export default VisualDisplay;
