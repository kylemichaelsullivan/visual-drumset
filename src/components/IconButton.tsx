import clsx from 'clsx';
import { ICON_SIZE_CLASSES } from '@/constants/iconSizes';
import Icon from './Icon';
import type { IconSize, IconType } from '@/types/icon';

type IconButtonProps = {
	icon: IconType;
	filetype: 'png' | 'svg';
	className?: string;
	size?: IconSize;
	title?: string;
	padded?: boolean;
	onClick?: () => void;
	onMouseDown?: () => void;
	onPointerDown?: () => void;
};

function IconButton({
	icon,
	filetype,
	className,
	size = 'md',
	title,
	padded = false,
	onClick,
	onMouseDown,
	onPointerDown,
}: IconButtonProps) {
	return (
		<button
			type='button'
			className={clsx(
				'IconButton flex justify-center items-center bg-transparent border-0 aspect-square',
				padded ? 'p-1' : clsx('p-0', ICON_SIZE_CLASSES[size]),
				className
			)}
			title={title}
			onClick={onClick}
			onMouseDown={onMouseDown}
			onPointerDown={onPointerDown}
		>
			<Icon icon={icon} filetype={filetype} size={size} />
		</button>
	);
}

export default IconButton;
