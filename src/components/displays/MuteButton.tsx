import IconButton from '@/components/IconButton';
import { useSounds } from '@/context/useSounds';

function MuteButton() {
	const { isMuted, setIsMuted } = useSounds();

	return (
		<IconButton
			icon={isMuted ? 'mute' : 'volume'}
			filetype='svg'
			className='MuteButton absolute top-0 left-0 hover:ring-1'
			size='md'
			title={isMuted ? 'Mute?' : 'Unmute?'}
			onMouseDown={() => setIsMuted(() => !isMuted)}
		/>
	);
}

export default MuteButton;
