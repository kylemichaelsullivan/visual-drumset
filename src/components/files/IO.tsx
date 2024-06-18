import Import from './Import';
import Export from './Export';

function IO() {
	return (
		<div className='IO flex flex-col justify-around items-end gap-4'>
			<Import />
			<Export />
		</div>
	);
}

export default IO;
