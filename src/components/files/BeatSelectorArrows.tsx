import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type BeatSelectorArrowsProps = {
	handleClick: (direction: 'L' | 'R') => void;
};

function BeatSelectorArrows({ handleClick }: BeatSelectorArrowsProps) {
	return (
		<div className='BeatSelectorArrows'>
			<div className='flex justify-between px-4'>
				<button
					type='button'
					className='bg-gray-100 border border-black px-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
					title='Previous Beat'
					onClick={() => handleClick('L')}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>

				<button
					type='button'
					className='bg-gray-100 border border-black px-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
					title='Next Beat'
					onClick={() => handleClick('R')}
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</button>
			</div>
		</div>
	);
}

export default BeatSelectorArrows;
