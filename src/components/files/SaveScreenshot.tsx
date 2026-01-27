import html2canvas from 'html2canvas';
import ButtonIO from './ButtonIO';

function SaveScreenshot() {
	async function handleSaveScreenshot() {
		const beatDisplayElement = document.querySelector(
			'.BeatDisplay'
		) as HTMLElement;
		if (!beatDisplayElement) {
			alert('Beat Display not found.');
			return;
		}

		// Fixed so screenshots are consistent regardless of viewport
		const targetWidth = 768;
		const rowHeight = 50;
		const countsHeight = 40;
		const iconSize = 32;
		const fontSize = 14;

		const visualDisplay = beatDisplayElement.closest('.VisualDisplay');
		const isDisplaying16ths =
			visualDisplay && !visualDisplay.classList.contains('hide-16ths');
		const gridCols = isDisplaying16ths ? 16 : 8;
		const cellWidth = targetWidth / gridCols;

		try {
			const canvas = await html2canvas(beatDisplayElement, {
				backgroundColor: '#ffffff',
				useCORS: true,
				scale: 1, // Fixed scale to prevent viewport-dependent scaling
				onclone: (clonedDoc, clonedElement) => {
					// Remove CSS rules that use unsupported "oklch" color or viewport units.
					// This keeps the layout/styles intact while avoiding html2canvas parse errors
					// and ensuring consistent screenshots regardless of viewport size.
					const styleSheets = Array.from(clonedDoc.styleSheets);
					for (const sheet of styleSheets) {
						try {
							const rules = sheet.cssRules;
							if (!rules) continue;
							for (let i = rules.length - 1; i >= 0; i -= 1) {
								const rule = rules[i];
								const ruleText = rule.cssText;
								if (
									ruleText.includes('oklch') ||
									ruleText.includes('5vw') ||
									ruleText.includes('10vw')
								) {
									sheet.deleteRule(i);
								}
							}
						} catch {
							// Ignore cross-origin or read-only stylesheets
						}
					}

					const element = clonedElement as HTMLElement;
					element.style.cssText = '';
					element.style.width = `${targetWidth}px`;
					element.style.display = 'flex';
					element.style.flexDirection = 'column';
					element.style.boxSizing = 'border-box';
					element.style.margin = '0';
					element.style.padding = '0';

					const counts = element.querySelector('.Counts') as HTMLElement;
					if (counts) {
						counts.style.cssText = '';
						counts.style.width = `${targetWidth}px`;
						counts.style.height = `${countsHeight}px`;
						counts.style.display = 'grid';
						counts.style.gridTemplateColumns = `repeat(${gridCols}, ${cellWidth}px)`;
						counts.style.boxSizing = 'border-box';
						counts.style.margin = '0';
						counts.style.padding = '0';
						counts.style.borderBottom = '1px solid #e5e7eb';

						const countCells = counts.querySelectorAll('.Count');
						countCells.forEach((cell, index) => {
							const cellEl = cell as HTMLElement;
							cellEl.style.cssText = '';
							// Hide even cells when hide-16ths is active (even = e and a)
							if (!isDisplaying16ths && index % 2 === 1) {
								cellEl.style.display = 'none';
							} else {
								cellEl.style.width = `${cellWidth}px`;
								cellEl.style.height = `${countsHeight}px`;
								cellEl.style.display = 'flex';
								cellEl.style.alignItems = 'center';
								cellEl.style.justifyContent = 'center';
								cellEl.style.boxSizing = 'border-box';
								cellEl.style.margin = '0';
								cellEl.style.padding = '0';
								cellEl.style.fontSize = `${fontSize}px`;
								cellEl.style.lineHeight = '1';
								const textContent = cellEl.textContent;
								if (textContent) {
									cellEl.style.color = '#111827';
								}
							}
						});
					}

					const componentMap: Record<string, string> = {
						Cymbals: 'Cymbal',
						Snares: 'Snare',
						Kicks: 'Kick',
					};
					const componentClasses = ['Cymbals', 'Snares', 'Kicks'];
					componentClasses.forEach((className) => {
						const grid = element.querySelector(`.${className}`) as HTMLElement;
						if (grid) {
							grid.style.cssText = '';
							grid.style.width = `${targetWidth}px`;
							grid.style.height = `${rowHeight}px`;
							grid.style.display = 'grid';
							grid.style.gridTemplateColumns = `repeat(${gridCols}, ${cellWidth}px)`;
							grid.style.boxSizing = 'border-box';
							grid.style.margin = '0';
							grid.style.padding = '0';

							const cellClass = componentMap[className];
							const cells = grid.querySelectorAll(`.${cellClass}`);
							cells.forEach((cell, index) => {
								const cellEl = cell as HTMLElement;
								cellEl.style.cssText = '';
								// Hide even cells (e and a)
								if (!isDisplaying16ths && index % 2 === 1) {
									cellEl.style.display = 'none';
								} else {
									cellEl.style.width = `${cellWidth}px`;
									cellEl.style.height = `${rowHeight}px`;
									cellEl.style.display = 'flex';
									cellEl.style.alignItems = 'center';
									cellEl.style.justifyContent = 'center';
									cellEl.style.boxSizing = 'border-box';
									cellEl.style.margin = '0';
									cellEl.style.padding = '8px 0'; // Fixed padding in pixels, not rem
								}
							});

							// Hardcode icon buttons and icons
							const iconButtons = grid.querySelectorAll('.IconButton');
							iconButtons.forEach((btn) => {
								const btnEl = btn as HTMLElement;
								btnEl.style.cssText = '';
								btnEl.style.width = `${iconSize}px`;
								btnEl.style.height = `${iconSize}px`;
								btnEl.style.maxWidth = `${iconSize}px`; // Override 5vw
								btnEl.style.maxHeight = `${iconSize}px`; // Override 10vw
								btnEl.style.minWidth = `${iconSize}px`;
								btnEl.style.minHeight = `${iconSize}px`;
								btnEl.style.display = 'flex';
								btnEl.style.alignItems = 'center';
								btnEl.style.justifyContent = 'center';
								btnEl.style.boxSizing = 'border-box';
								btnEl.style.margin = '0 auto';
								btnEl.style.padding = '0';
								btnEl.style.border = '0';
								btnEl.style.background = 'transparent';
							});

							const icons = grid.querySelectorAll('.Icon');
							icons.forEach((icon) => {
								const iconEl = icon as HTMLImageElement;
								iconEl.style.cssText = '';
								iconEl.style.width = `${iconSize}px`;
								iconEl.style.height = `${iconSize}px`;
								iconEl.style.maxWidth = `${iconSize}px`;
								iconEl.style.maxHeight = `${iconSize}px`;
								iconEl.style.display = 'block';
								iconEl.style.margin = '0 auto';
								iconEl.style.objectFit = 'contain';
							});
						}
					});
				},
			});

			// Use the canvas exactly as rendered by html2canvas so the screenshot
			// matches the on-screen BeatDisplay without stretching/cropping.
			const finalCanvas = canvas;

			const dataUri = finalCanvas.toDataURL('image/png');
			const defaultFilename = 'beat.png';

			const linkElement = document.createElement('a');
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', defaultFilename);
			linkElement.click();

			alert('Screenshot saved successfully.');
		} catch (error) {
			console.error('Error capturing screenshot:', error);
			alert('Failed to save screenshot.');
		}
	}

	return (
		<div className='SaveScreenshot flex justify-end'>
			<ButtonIO
				action='screenshot'
				icon='screenshot'
				onMouseDown={handleSaveScreenshot}
			/>
		</div>
	);
}

export default SaveScreenshot;
