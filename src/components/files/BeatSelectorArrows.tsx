import IconButton from '@/components/IconButton';
import { getButtonClass } from '@/scripts';

type BeatSelectorArrowsDirection = 'L' | 'R' | 'random';
type BeatSelectorArrowsIcon = 'skip-back' | 'dice' | 'skip-forward';

type BeatSelectorArrowsProps = {
	handleClick: (direction: BeatSelectorArrowsDirection) => void;
};

type ButtonConfig = {
	icon: BeatSelectorArrowsIcon;
	size: 'md' | 'lg';
	title: string;
	direction: BeatSelectorArrowsDirection;
};

const BUTTON_CONFIGS: ButtonConfig[] = [
	{
		icon: 'skip-back',
		size: 'md',
		title: 'Previous Beat',
		direction: 'L',
	},
	{
		icon: 'dice',
		size: 'lg',
		title: 'Random Beat',
		direction: 'random',
	},
	{
		icon: 'skip-forward',
		size: 'md',
		title: 'Next Beat',
		direction: 'R',
	},
];

function BeatSelectorArrows({ handleClick }: BeatSelectorArrowsProps) {
	return (
		<div className='BeatSelectorArrows flex flex-auto justify-between gap-4 items-center w-full'>
			{BUTTON_CONFIGS.map((config) => (
				<IconButton
					icon={config.icon}
					filetype='svg'
					className={getButtonClass(true)}
					size={config.size}
					title={config.title}
					onClick={() => handleClick(config.direction)}
					key={config.direction}
				/>
			))}
		</div>
	);
}

export default BeatSelectorArrows;
