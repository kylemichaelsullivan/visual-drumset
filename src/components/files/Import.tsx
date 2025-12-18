import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useDrums } from '@/context/useDrums';
import { isBeatValid } from './Zod';
import type { ChangeEvent } from 'react';

function Import() {
	const { setCymbals, setSnares, setKicks } = useDrums();
	const [file, setFile] = useState<File | null>(null);

	function handleImport(e: ChangeEvent<HTMLInputElement>) {
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
					const { cymbals, snares, kicks } = jsonObj;

					if (!isBeatValid(cymbals, snares, kicks)) {
						return;
					}

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
		<div className='Import flex flex-col gap-2 items-end sm:flex-row sm:items-center'>
			<input
				type='file'
				className='cursor-pointer'
				accept='.json'
				onChange={handleImport}
				id='file-upload'
			/>

			<button
				type='button'
				className='flex gap-2 items-center bg-gray-100 border border-black px-4 py-2 transition-colors duration-300 hover:bg-gray-300 hover:ring-1'
				title='Import Beat (.json)'
				onMouseDown={handleUpload}
			>
				<span>Import</span>
				<FontAwesomeIcon icon={faUpload} />
			</button>
		</div>
	);
}

export default Import;
