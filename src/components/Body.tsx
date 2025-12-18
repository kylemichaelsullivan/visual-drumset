import { DrumsProvider } from '@/context/Drums';
import { EditingProvider } from '@/context/Editing';
import { IsPlayingProvider } from '@/context/IsPlaying';
import { SoundsProvider } from '@/context/Sounds';
import VisualDisplay from './displays/VisualDisplay';
import BeatSelector from './files/BeatSelector';
import IO from './files/IO';
import Metronome from './metronome/Metronome';

function Body() {
	return (
		<DrumsProvider>
			<IsPlayingProvider>
				<SoundsProvider>
					<main className='Body flex flex-col justify-between gap-4 w-full max-w-screen-xl p-4 mx-auto'>
						<EditingProvider>
							<VisualDisplay />
						</EditingProvider>
						<Metronome />
						<BeatSelector />
						<IO />
					</main>
				</SoundsProvider>
			</IsPlayingProvider>
		</DrumsProvider>
	);
}

export default Body;
