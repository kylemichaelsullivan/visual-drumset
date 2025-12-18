import Export from './Export';
import Import from './Import';

function IO() {
	return (
		<div className='IO flex flex-col justify-around items-end gap-4'>
			<Import />
			<Export />
		</div>
	);
}

export default IO;
