import Export from './Export';
import Import from './Import';

type ContentIOProps = {
	isOpen: boolean;
};

function ContentIO({ isOpen }: ContentIOProps) {
	return (
		<div
			className={`ContentIO flex flex-col gap-4 w-full ${!isOpen ? 'hidden' : ''}`}
		>
			<Import />
			<Export />
		</div>
	);
}

export default ContentIO;
