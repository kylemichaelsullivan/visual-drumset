type IconProps = {
	icon: 'cymbal' | 'snare' | 'bass';
	isActive?: boolean;
};

function Icon({ icon, isActive = false }: IconProps) {
	return (
		<button
			type='button'
			className={`Icon ${icon} ${isActive ? 'active' : ''}`}
		>
			<img src={`/icons/${icon}.png`} alt={icon} />
		</button>
	);
}

export default Icon;
