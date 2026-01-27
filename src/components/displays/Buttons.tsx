import Display16thsButton from '@/components/displays/Display16thsButton';
import EditButton from '@/components/displays/EditButton';
import MuteButton from '@/components/displays/MuteButton';

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
