type BeatSelectorApplyProps = {
	handleClick: () => void;
};

function BeatSelectorApply({ handleClick }: BeatSelectorApplyProps) {
	return (
		<div className='BeatSelectorApply'>
			<button
				type='button'
				className='bg-gray-100 border border-black w-max px-4 py-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
				title='Apply Beat'
				onClick={handleClick}
			>
				Apply Beat
			</button>
		</div>
	);
}

export default BeatSelectorApply;
