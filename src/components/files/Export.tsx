import { useDrums } from '../../context/Drums';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

function Export() {
	const { cymbals, snares, kicks } = useDrums();

	function handleExport() {
		const stringifiedJSON = JSON.stringify({ cymbals, snares, kicks });

		const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
			stringifiedJSON
		)}`;

		const defaultExportFilename = 'beat.json';

		const linkElement = document.createElement('a');
		linkElement.setAttribute('href', dataUri);
		linkElement.setAttribute('download', defaultExportFilename);
		linkElement.click();

		alert('Beat exported successfully.');
	}

	return (
		<div className='Export'>
			<button
				type='button'
				className='flex gap-2 items-center bg-gray-100 border border-black px-4 py-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
				title='Export Beat (.json)'
				onMouseDown={handleExport}
			>
				<span>Export</span>
				<FontAwesomeIcon icon={faDownload} />
			</button>
		</div>
	);
}

export default Export;
