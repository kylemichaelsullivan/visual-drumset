import { useState } from 'react';
import ContentIO from './ContentIO';
import ToggleIO from './ToggleIO';

function IO() {
	const [isOpen, setIsOpen] = useState(false);

	function handleToggle() {
		setIsOpen(!isOpen);
	}

	return (
		<div className='IO flex flex-col justify-around items-center gap-4'>
			<ToggleIO isOpen={isOpen} handleToggle={handleToggle} />
			<ContentIO isOpen={isOpen} />
		</div>
	);
}

export default IO;
