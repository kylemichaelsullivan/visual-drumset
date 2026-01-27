import Button from '@/components/displays/Button';
import { useSounds } from '@/hooks/useSounds';

function MuteButton() {
	const { isMuted, setIsMuted } = useSounds();

	return (
		<Button
			icon={isMuted ? 'mute' : 'volume'}
			componentName='MuteButton'
			size='md'
			title={isMuted ? 'Mute?' : 'Unmute?'}
			onMouseDown={() => setIsMuted(() => !isMuted)}
		/>
	);
}

export default MuteButton;
