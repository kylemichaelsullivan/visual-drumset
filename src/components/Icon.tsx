import clsx from 'clsx';
import { ICON_SIZE_CLASSES } from '@/constants/iconSizes';
import type { IconSize, IconType } from '@/types/icon';

type IconProps = {
	icon: IconType;
	filetype: 'png' | 'svg';
	size?: IconSize;
	className?: string;
};

function Icon({ icon, filetype, size = 'sm', className }: IconProps) {
	const path =
		filetype === 'png'
			? `/icons/drumset/${icon}.${filetype}`
			: `/icons/${icon}.${filetype}`;

	return (
		<img
			src={path}
			className={clsx(
				'Icon block mx-auto aspect-square object-contain',
				ICON_SIZE_CLASSES[size],
				className
			)}
			alt={icon}
		/>
	);
}

export default Icon;
