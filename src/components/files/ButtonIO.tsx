import clsx from 'clsx';
import Icon from '@/components/Icon';
import { getButtonClass } from '@/scripts';
import type { IconType } from '@/types/icon';

interface ButtonIOProps {
	action: 'import' | 'export';
	icon: IconType;
	onMouseDown: () => void;
}

function ButtonIO({ action, icon, onMouseDown }: ButtonIOProps) {
	const Action = action.charAt(0).toUpperCase() + action.slice(1);

	return (
		<button
			type='button'
			className={clsx('flex gap-2 items-center', getButtonClass())}
			title={`${Action} Beat (.json)`}
			onMouseDown={onMouseDown}
		>
			<span>{Action}</span>
			<Icon icon={icon} filetype='svg' size='sm' />
		</button>
	);
}

export default ButtonIO;
