import clsx from 'clsx';
import IconButton from '@/components/IconButton';
import { useSounds } from '@/hooks/useSounds';
import type { drums } from '@/types/drums';
import type { IconSize } from '@/types/icon';

type DrumIconProps = {
	icon: drums;
	isActive?: boolean;
	size?: IconSize;
};

function DrumIcon({ icon, isActive = false, size = 'lg' }: DrumIconProps) {
	const { playSound } = useSounds();

	const title = icon.charAt(0).toUpperCase() + icon.slice(1);

	return (
		<IconButton
			className={clsx('Icon', title, isActive && 'active')}
			icon={icon}
			filetype='png'
			size={size}
			title={title}
			onClick={() => playSound(icon)}
		/>
	);
}

export default DrumIcon;
