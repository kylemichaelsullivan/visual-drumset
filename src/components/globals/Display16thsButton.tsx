import { useButtonValues } from '@/hooks/useButtonValues';
import Button from './Button';

function Display16thsButton() {
	const { isDisplaying16ths, setIsDisplaying16ths } = useButtonValues();

	return (
		<div className='hidden sm:block'>
			<Button
				icon={isDisplaying16ths ? 'glasses-show' : 'glasses-hide'}
				componentName='Display16thsButton'
				size='lg'
				title={isDisplaying16ths ? 'Hide 16ths?' : 'Show 16ths?'}
				onClick={() => {
					setIsDisplaying16ths(!isDisplaying16ths);
				}}
			/>
		</div>
	);
}

export default Display16thsButton;
