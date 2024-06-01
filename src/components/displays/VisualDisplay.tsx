import type { counts } from '../../types/counts';

import EditButton from '../edits/EditButton';
import Counts from './Counts';
import ShowBeat from './ShowBeat';
import EditBeat from '../edits/EditBeat';

type VisualDisplayProps = {
	isEditing: boolean;
	cymbals: counts;
	snares: counts;
	kicks: counts;
	setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
	setCymbals: React.Dispatch<React.SetStateAction<counts>>;
	setSnares: React.Dispatch<React.SetStateAction<counts>>;
	setKicks: React.Dispatch<React.SetStateAction<counts>>;
};

function VisualDisplay({
	isEditing,
	cymbals,
	snares,
	kicks,
	setIsEditing,
	setCymbals,
	setSnares,
	setKicks,
}: VisualDisplayProps) {
	return (
		<div className='VisualDisplay relative flex flex-col border p-4 pt-8'>
			<EditButton isEditing={isEditing} setIsEditing={setIsEditing} />

			<Counts />

			{isEditing ? (
				<EditBeat
					cymbals={cymbals}
					snares={snares}
					kicks={kicks}
					setCymbals={setCymbals}
					setSnares={setSnares}
					setKicks={setKicks}
				/>
			) : (
				<ShowBeat cymbals={cymbals} snares={snares} kicks={kicks} />
			)}
		</div>
	);
}

export default VisualDisplay;
