import BeatSelectorApply from './BeatSelectorApply';
import BeatSelectorArrows from './BeatSelectorArrows';

type BeatSelectorActionsProps = {
	handleBeatArrow: (direction: 'L' | 'R' | 'random') => void;
	applyBeat: () => void;
};

function BeatSelectorActions({
	handleBeatArrow,
	applyBeat,
}: BeatSelectorActionsProps) {
	return (
		<div className='BeatSelectorActions flex flex-col flex-auto gap-4 items-center sm:flex-row sm:items-center'>
			<BeatSelectorArrows handleClick={handleBeatArrow} />
			<BeatSelectorApply handleClick={applyBeat} />
		</div>
	);
}

export default BeatSelectorActions;
