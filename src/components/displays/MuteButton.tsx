import { faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSounds } from '@/context/useSounds';

function MuteButton() {
	const { isMuted, setIsMuted } = useSounds();

	return (
		<button
			type='button'
			className='MuteButton absolute w-8 h-8 top-0 left-0 hover:ring-1'
			title={isMuted ? 'See Beat' : 'Edit Beat'}
			onMouseDown={() => setIsMuted(() => !isMuted)}
		>
			<FontAwesomeIcon icon={isMuted ? faVolumeOff : faVolumeUp} />
		</button>
	);
}

export default MuteButton;
