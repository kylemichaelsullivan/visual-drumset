import { useMetronome } from '@/context/useIsPlaying';
import Blinker from './Blinker';
import Tempo from './Tempo';

function Metronome() {
	const { bpm, setBpm, isRunning, setIsRunning } = useMetronome();

	return (
		<div className='Metronome flex flex-col justify-center gap-4 items-center border p-4 sm:flex-row'>
			<Blinker bpm={bpm} isRunning={isRunning} setIsRunning={setIsRunning} />
			<Tempo bpm={bpm} setBpm={setBpm} />
		</div>
	);
}

export default Metronome;
