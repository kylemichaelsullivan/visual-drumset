import Display16thsButton from './Display16thsButton';
import EditButton from './EditButton';
import MuteButton from './MuteButton';

function Buttons() {
	return (
		<div className='Buttons flex justify-between gap-2 items-start pb-4'>
			<MuteButton />
			<Display16thsButton />
			<EditButton />
		</div>
	);
}

export default Buttons;
