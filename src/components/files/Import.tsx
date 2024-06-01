import type { counts } from '../../types/counts';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

type ImportProps = {
	setCymbals: React.Dispatch<React.SetStateAction<counts>>;
	setSnares: React.Dispatch<React.SetStateAction<counts>>;
	setKicks: React.Dispatch<React.SetStateAction<counts>>;
};

function Import({ setCymbals, setSnares, setKicks }: ImportProps) {
	const [file, setFile] = useState<File | null>(null);

	function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	}

	function handleUpload() {
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target) {
					const jsonObj = JSON.parse(e.target.result as string);

					const cymbals = jsonObj.cymbals;
					const snares = jsonObj.snares;
					const kicks = jsonObj.kicks;

					setCymbals(() => cymbals);
					setSnares(() => snares);
					setKicks(() => kicks);

					const fileUpload = document.getElementById(
						'file-upload'
					) as HTMLInputElement;
					if (fileUpload) {
						fileUpload.value = '';
					}
				}
			};
			reader.readAsText(file);
		} else {
			alert('No file selected');
		}
	}

	return (
		<div className='Import flex gap-2 items-center'>
			<button
				type='button'
				className='flex gap-2 items-center bg-gray-100 border border-black px-4 py-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
				title='Import Beat (.json)'
				onMouseDown={handleUpload}
			>
				<span>Import</span>
				<FontAwesomeIcon icon={faUpload} />
			</button>
			<input
				type='file'
				accept='.json'
				onChange={handleImport}
				id='file-upload'
			/>
		</div>
	);
}

export default Import;
