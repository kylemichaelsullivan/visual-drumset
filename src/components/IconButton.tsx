import clsx from 'clsx';
import Icon from './Icon';
import type { IconSize, IconType } from '@/types/icon';

type IconButtonProps = {
	icon: IconType;
	filetype: 'png' | 'svg';
	className?: string;
	size?: IconSize;
	title?: string;
	onClick?: () => void;
	onMouseDown?: () => void;
};

function IconButton({
	icon,
	filetype,
	className,
	size = 'md',
	title,
	onClick,
	onMouseDown,
}: IconButtonProps) {
	const sizeClasses: Record<IconSize, string> = {
		sm: 'w-6 h-6',
		md: 'w-8 h-8',
		lg: 'w-10 h-10',
	};

	return (
		<button
			type='button'
			className={clsx(
				'IconButton flex justify-center items-center bg-transparent border-0 p-0',
				sizeClasses[size],
				className
			)}
			title={title}
			onClick={onClick}
			onMouseDown={onMouseDown}
		>
			<Icon icon={icon} filetype={filetype} size={size} />
		</button>
	);
}

export default IconButton;
