import { useButtonHandler } from '@/hooks/useButtonHandler';

type SkipLinkProps = {
	targetSelector: string;
	text: string;
};

function SkipLink({ targetSelector, text }: SkipLinkProps) {
	const scrollToTarget = () => {
		const targetElement = document.querySelector(targetSelector);
		if (targetElement && targetElement instanceof HTMLElement) {
			const offset = 32; // 2rem offset for better visual spacing
			const elementPosition = targetElement.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.scrollY - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});

			const focusTarget = () => {
				const focusableElement = targetElement.querySelector<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
				);

				if (focusableElement) {
					focusableElement.focus();
				} else {
					const originalTabIndex = targetElement.getAttribute('tabindex');
					targetElement.setAttribute('tabindex', '-1');
					targetElement.focus();

					// Short delay to ensure focus is set
					setTimeout(() => {
						if (originalTabIndex === null) {
							targetElement.removeAttribute('tabindex');
						} else {
							targetElement.setAttribute('tabindex', originalTabIndex);
						}
					}, 0);
				}
			};

			requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					setTimeout(focusTarget, 300);
				});
			});
		}
	};

	const { handleClick, handleKeyDown } = useButtonHandler(scrollToTarget);

	return (
		<button
			type='button'
			className='SkipLink sr-only bg-black text-white text-center px-4 py-2 z-50 focus:block focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2'
			aria-label={text}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			{text}
		</button>
	);
}

export default SkipLink;
