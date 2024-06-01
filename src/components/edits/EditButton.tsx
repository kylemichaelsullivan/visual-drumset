import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck } from '@fortawesome/free-solid-svg-icons';

type EditButtonProps = {
	isEditing: boolean;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditButton({ isEditing, setIsEditing }: EditButtonProps) {
	return (
		<button
			type='button'
			className='absolute w-8 h-8 top-0 right-0'
			title={isEditing ? 'See Beat' : 'Edit Beat'}
			onMouseDown={() => setIsEditing(() => !isEditing)}
		>
			<FontAwesomeIcon icon={isEditing ? faCheck : faPen} />
		</button>
	);
}

export default EditButton;
