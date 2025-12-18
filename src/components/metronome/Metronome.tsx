import { useState } from 'react';
import Blinker from './Blinker';
import Tempo from './Tempo';

function Metronome() {
	const [bpm, setBpm] = useState(120);
	const [isRunning, setIsRunning] = useState(false);

	return (
		<div className='Metronome flex flex-col justify-center gap-4 items-center border p-4 sm:flex-row'>
			<Blinker bpm={bpm} isRunning={isRunning} setIsRunning={setIsRunning} />
			<Tempo bpm={bpm} setBpm={setBpm} />
		</div>
	);
}

export default Metronome;
