import type { counts } from '../../types/counts';

import Cymbals from './Cymbals';
import Snares from './Snares';
import Kicks from './Kicks';

type EditBeatProps = {
	cymbals: counts;
	snares: counts;
	kicks: counts;
	setCymbals: React.Dispatch<React.SetStateAction<counts>>;
	setSnares: React.Dispatch<React.SetStateAction<counts>>;
	setKicks: React.Dispatch<React.SetStateAction<counts>>;
};

function EditBeat({
	cymbals,
	snares,
	kicks,
	setCymbals,
	setSnares,
	setKicks,
}: EditBeatProps) {
	return (
		<>
			<Cymbals cymbals={cymbals} setCymbals={setCymbals} />
			<Snares snares={snares} setSnares={setSnares} />
			<Kicks kicks={kicks} setKicks={setKicks} />
		</>
	);
}

export default EditBeat;
