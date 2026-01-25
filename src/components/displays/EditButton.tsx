import { useEditing } from '@/context/useEditing';
import IconButton from '@/components/IconButton';

function EditButton() {
	const { isEditing, setIsEditing } = useEditing();

	return (
		<IconButton
			icon={isEditing ? 'check' : 'pen'}
			filetype='svg'
			className='EditButton absolute top-0 right-0 hover:ring-1'
			size='md'
			title={isEditing ? 'See Beat' : 'Edit Beat'}
			onMouseDown={() => setIsEditing(() => !isEditing)}
		/>
	);
}

export default EditButton;
