import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getButtonClass } from '@/scripts';

type BeatSelectorArrowsProps = {
	handleClick: (direction: 'L' | 'R') => void;
};

function BeatSelectorArrows({ handleClick }: BeatSelectorArrowsProps) {
	return (
		<div className='BeatSelectorArrows'>
			<div className='flex justify-between px-4'>
				<button
					type='button'
					className={getButtonClass(true)}
					title='Previous Beat'
					onClick={() => handleClick('L')}
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>

				<button
					type='button'
					className={getButtonClass(true)}
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
