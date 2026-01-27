import { useIsPlaying } from '@/hooks/useIsPlaying';
import Blinker from './Blinker';
import ModifyTempoButton from './ModifyTempoButton';
import Tempo from './Tempo';

function MetronomeContent() {
	const { bpm, setBpm, isRunning, setIsRunning, setPosition } = useIsPlaying();

	return (
		<div className='MetronomeContent relative flex flex-col justify-center gap-4 items-center border px-8 py-4 sm:flex-row'>
			<ModifyTempoButton direction='decrease' />

			<Blinker
				bpm={bpm}
				isRunning={isRunning}
				setIsRunning={setIsRunning}
				setPosition={setPosition}
			/>
			<Tempo bpm={bpm} setBpm={setBpm} />

			<ModifyTempoButton direction='increase' />
		</div>
	);
}

export default MetronomeContent;
