import SkipLink from '@/components/SkipLink';
import MetronomeContent from './MetronomeContent';

function Metronome() {
	return (
		<div className='Metronome flex flex-col gap-4'>
			<SkipLink targetSelector='.BeatSelector' text='Skip to Beat Selector' />

			<MetronomeContent />
		</div>
	);
}

export default Metronome;
