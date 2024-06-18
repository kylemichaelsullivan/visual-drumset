import { DrumsProvider } from '../context/Drums';
import { EditingProvider } from '../context/Editing';

import VisualDisplay from './displays/VisualDisplay';

import Metronome from './metronome/Metronome';
import BeatSelector from './files/BeatSelector';
import IO from './files/IO';

function Body() {
	return (
		<DrumsProvider>
			<main className='Body flex flex-col justify-between gap-4 p-4'>
				<EditingProvider>
					<VisualDisplay />
				</EditingProvider>
				<Metronome />
				<BeatSelector />
				<IO />
			</main>
		</DrumsProvider>
	);
}

export default Body;
