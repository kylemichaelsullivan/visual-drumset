import { ButtonValuesProvider } from '@/context/buttonValues';
import { DrumsProvider } from '@/context/Drums';
import { IsPlayingProvider } from '@/context/IsPlaying';
import { SoundsProvider } from '@/context/SoundsProvider';
import VisualDisplay from './displays/VisualDisplay';
import BeatSelector from './files/BeatSelector';
import IO from './files/IO';
import Metronome from './metronome/Metronome';

function Body() {
	return (
		<DrumsProvider>
			<IsPlayingProvider>
				<ButtonValuesProvider>
					<SoundsProvider>
						<main className='Body flex flex-col justify-between gap-4 w-full max-w-screen-xl px-8 py-4 mx-auto'>
							<VisualDisplay />
							<Metronome />
							<BeatSelector />
							<IO />
						</main>
					</SoundsProvider>
				</ButtonValuesProvider>
			</IsPlayingProvider>
		</DrumsProvider>
	);
}

export default Body;
