import { getButtonClass } from '@/scripts';

type BeatSelectorApplyProps = {
	handleClick: () => void;
};

function BeatSelectorApply({ handleClick }: BeatSelectorApplyProps) {
	return (
		<div className='BeatSelectorApply'>
			<button
				type='button'
				className={getButtonClass()}
				title='Apply Beat'
				onClick={handleClick}
			>
				Apply Beat
			</button>
		</div>
	);
}

export default BeatSelectorApply;
