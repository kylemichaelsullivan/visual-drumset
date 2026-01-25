import clsx from 'clsx';
import type { IconSize, IconType } from '@/types/icon';

const sizeClasses: Record<IconSize, string> = {
	sm: 'w-4 h-4',
	md: 'w-6 h-6',
	lg: 'w-8 h-8',
};

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
			className={clsx('Icon', sizeClasses[size], className)}
			alt={icon}
		/>
	);
}

export default Icon;
