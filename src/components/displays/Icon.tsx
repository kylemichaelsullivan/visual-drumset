import { useSounds } from '@/context/useSounds';
import type { drums } from '@/types/drums';

type IconProps = {
	icon: drums;
	isActive?: boolean;
};

function Icon({ icon, isActive = false }: IconProps) {
	const { playSound } = useSounds();

	return (
		<button
			type='button'
			className={`Icon ${icon} ${isActive ? 'active' : ''}`}
			onClick={() => playSound(icon)}
		>
			<img src={`/icons/${icon}.png`} alt={icon} />
		</button>
	);
}

export default Icon;
