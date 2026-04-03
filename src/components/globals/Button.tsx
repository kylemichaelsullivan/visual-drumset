import clsx from 'clsx';
import IconButton from '@/components/IconButton';
import type { IconSize, IconType } from '@/types/icon';

interface ButtonProps {
	icon: IconType;
	componentName?: 'Display16thsButton' | 'EditButton' | 'MuteButton';
	size?: IconSize;
	title?: string;
	onClick?: () => void;
	onMouseDown?: () => void;
	onPointerDown?: () => void;
}

function Button({
	icon,
	componentName,
	size = 'md',
	title,
	onClick,
	onMouseDown,
	onPointerDown,
}: ButtonProps) {
	return (
		<IconButton
			className={clsx(
				componentName,
				size === 'lg' && 'mx-auto',
				'hover:ring-1'
			)}
			icon={icon}
			filetype='svg'
			size={size}
			title={title}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onPointerDown={onPointerDown}
		/>
	);
}

export default Button;
