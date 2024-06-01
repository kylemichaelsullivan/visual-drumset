import type { counts } from '../../types/counts';
import type { beat } from '../../types/beat';

import Import from './Import';
import Export from './Export';

type IOProps = {
	setCymbals: React.Dispatch<React.SetStateAction<counts>>;
	setSnares: React.Dispatch<React.SetStateAction<counts>>;
	setKicks: React.Dispatch<React.SetStateAction<counts>>;
	beat: beat;
};

function IO({ setCymbals, setSnares, setKicks, beat }: IOProps) {
	return (
		<div className='IO flex flex-col justify-around gap-4 sm:flex-row'>
			<Import
				setCymbals={setCymbals}
				setSnares={setSnares}
				setKicks={setKicks}
			/>

			<Export beat={beat} />
		</div>
	);
}

export default IO;
