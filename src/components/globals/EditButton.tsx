import { useButtonValues } from '@/hooks/useButtonValues';
import Button from './Button';

function EditButton() {
	const { isEditing, setIsEditing } = useButtonValues();

	return (
		<Button
			icon={isEditing ? 'check' : 'pen'}
			componentName='EditButton'
			size='md'
			title={isEditing ? 'See Beat' : 'Edit Beat'}
			onMouseDown={() => setIsEditing(() => !isEditing)}
		/>
	);
}

export default EditButton;
