import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { useDrums } from '@/context/useDrums';
import ButtonIO from './ButtonIO';

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
		<div className='Export flex justify-end'>
			<ButtonIO action='export' icon={faDownload} onMouseDown={handleExport} />
		</div>
	);
}

export default Export;
