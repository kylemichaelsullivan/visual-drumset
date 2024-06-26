import { Fragment } from 'react';

function Counts() {
	return (
		<div className='Counts grid grid-cols-8 border-b sm:grid-cols-16'>
			{Array.from({ length: 4 }, (_, i) => i + 1).map((num) => (
				<Fragment key={num}>
					<div className='Count text-center text-gray-900'>{num}</div>
					<div className='Count text-center text-gray-300'>e</div>
					<div className='Count text-center text-gray-500'>&</div>
					<div className='Count text-center text-gray-300'>a</div>
				</Fragment>
			))}
		</div>
	);
}

export default Counts;
