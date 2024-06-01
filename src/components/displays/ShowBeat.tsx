import type { counts } from '../../types/counts';

import Cymbals from './Cymbals';
import Kicks from './Kicks';
import Snares from './Snares';

type ShowBeatProps = {
	cymbals: counts;
	snares: counts;
	kicks: counts;
};

function ShowBeat({ cymbals, snares, kicks }: ShowBeatProps) {
	return (
		<>
			<Cymbals cymbals={cymbals} />
			<Snares snares={snares} />
			<Kicks kicks={kicks} />
		</>
	);
}

export default ShowBeat;
