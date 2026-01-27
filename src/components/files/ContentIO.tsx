import clsx from 'clsx';
import Export from './Export';
import Import from './Import';
import SaveScreenshot from './SaveScreenshot';

type ContentIOProps = {
	isOpen: boolean;
};

function ContentIO({ isOpen }: ContentIOProps) {
	return (
		<div
			className={clsx(
				'ContentIO flex flex-col gap-4 w-full',
				!isOpen && 'hidden'
			)}
		>
			<Import />
			<Export />
			<SaveScreenshot />
		</div>
	);
}

export default ContentIO;
