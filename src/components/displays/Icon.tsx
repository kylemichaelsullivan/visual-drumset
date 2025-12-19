import { useSounds } from '@/context/useSounds';
import type { drums } from '@/types/drums';

type IconProps = {
	icon: drums;
	isActive?: boolean;
};

function Icon({ icon, isActive = false }: IconProps) {
	const { playSound } = useSounds();

	const title = icon.charAt(0).toUpperCase() + icon.slice(1);

	return (
		<button
			type='button'
			className={`Icon ${title} ${isActive ? 'active' : ''}`}
			title={title}
			onClick={() => playSound(icon)}
		>
			<img src={`/icons/${icon}.png`} alt={icon} />
		</button>
	);
}

export default Icon;
