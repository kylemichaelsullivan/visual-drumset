import IconButton from '@/components/IconButton';
import { getButtonClass } from '@/scripts';

type BeatSelectorArrowsProps = {
	handleClick: (direction: 'L' | 'R' | 'random') => void;
};

function BeatSelectorArrows({ handleClick }: BeatSelectorArrowsProps) {
	return (
		<div className='BeatSelectorArrows flex-auto text-center'>
			<div className='flex justify-between px-4'>
				<IconButton
					icon='skip-back'
					filetype='svg'
					className={getButtonClass(true)}
					size='md'
					title='Previous Beat'
					onClick={() => handleClick('L')}
				/>

				<IconButton
					icon='dice'
					filetype='svg'
					className={getButtonClass(true)}
					size='lg'
					title='Random Beat'
					onClick={() => handleClick('random')}
				/>

				<IconButton
					icon='skip-forward'
					filetype='svg'
					className={getButtonClass(true)}
					size='md'
					title='Next Beat'
					onClick={() => handleClick('R')}
				/>
			</div>
		</div>
	);
}

export default BeatSelectorArrows;
