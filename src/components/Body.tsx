import VisualDisplay from './displays/VisualDisplay';
import Metronome from './metronome/Metronome';
import IO from './files/IO';
import { DrumsProvider } from '../context/Drums';
import { EditingProvider } from '../context/Editing';

function Body() {
	return (
		<DrumsProvider>
			<main className='Body flex flex-col justify-between gap-4 p-4'>
				<EditingProvider>
					<VisualDisplay />
				</EditingProvider>
				<Metronome />
				<IO />
			</main>
		</DrumsProvider>
	);
}

export default Body;
