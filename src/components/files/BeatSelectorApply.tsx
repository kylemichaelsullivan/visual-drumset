import clsx from 'clsx';
import { getButtonClass } from '@/scripts';

type BeatSelectorApplyProps = {
	handleClick: () => void;
};

function BeatSelectorApply({ handleClick }: BeatSelectorApplyProps) {
	return (
		<div className='BeatSelectorApply flex-1 text-center'>
			<button
				type='button'
				className={clsx(getButtonClass(), 'min-w-28')}
				title='Apply Beat'
				onClick={handleClick}
			>
				Apply Beat
			</button>
		</div>
	);
}

export default BeatSelectorApply;
