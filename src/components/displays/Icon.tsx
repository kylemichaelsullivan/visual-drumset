type IconProps = {
	icon: 'cymbal' | 'snare' | 'bass';
};

function Icon({ icon }: IconProps) {
	return (
		<button type='button' className={`Icon ${icon}`}>
			<img src={`/icons/${icon}.png`} alt={icon} />
		</button>
	);
}

export default Icon;
