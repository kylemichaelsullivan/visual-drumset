import { faFloppyDisk, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type ToggleIOProps = {
	isOpen: boolean;
	handleToggle: () => void;
};

function ToggleIO({ isOpen, handleToggle }: ToggleIOProps) {
	return (
		<button
			type='button'
			className={`ToggleIO border border-transparent rounded-sm text-2xl w-10 h-10 hover:border-black`}
			title={isOpen ? 'Close File Operations' : 'Open File Operations'}
			onClick={handleToggle}
		>
			<FontAwesomeIcon icon={isOpen ? faTimes : faFloppyDisk} />
		</button>
	);
}

export default ToggleIO;
