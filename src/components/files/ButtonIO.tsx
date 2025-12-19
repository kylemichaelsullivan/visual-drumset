import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getButtonClass } from '@/scripts';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ButtonIOProps {
	action: 'import' | 'export';
	icon: IconDefinition;
	onMouseDown: () => void;
}

function ButtonIO({ action, icon, onMouseDown }: ButtonIOProps) {
	const Action = action.charAt(0).toUpperCase() + action.slice(1);

	return (
		<button
			type='button'
			className={`flex gap-2 items-center ${getButtonClass()}`}
			title={`${Action} Beat (.json)`}
			onMouseDown={onMouseDown}
		>
			<span>{Action}</span>
			<FontAwesomeIcon icon={icon} />
		</button>
	);
}

export default ButtonIO;
