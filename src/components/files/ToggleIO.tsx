import IconButton from '../IconButton';

type ToggleIOProps = {
	isOpen: boolean;
	handleToggle: () => void;
};

function ToggleIO({ isOpen, handleToggle }: ToggleIOProps) {
	return (
		<IconButton
			icon={isOpen ? 'close' : 'save'}
			filetype='svg'
			className='ToggleIO border border-transparent rounded-sm hover:border-black'
			size='lg'
			title={isOpen ? 'Close File Operations' : 'Open File Operations'}
			onClick={handleToggle}
		/>
	);
}

export default ToggleIO;
