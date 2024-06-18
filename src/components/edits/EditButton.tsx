import { useEditing } from '../../context/Editing';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

function EditButton() {
	const { isEditing, setIsEditing } = useEditing();

	return (
		<button
			type='button'
			className='absolute w-8 h-8 top-0 right-0 hover:ring-1'
			title={isEditing ? 'See Beat' : 'Edit Beat'}
			onMouseDown={() => setIsEditing(() => !isEditing)}
		>
			<FontAwesomeIcon icon={isEditing ? faCheck : faPen} />
		</button>
	);
}

export default EditButton;
