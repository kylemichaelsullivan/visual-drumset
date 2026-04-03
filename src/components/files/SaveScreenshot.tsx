import html2canvas from 'html2canvas';
import ButtonIO from './ButtonIO';

/**
 * Clone has no `.VisualDisplay` ancestor, so reproduce hide-16ths slot rules from index.css.
 * Extra vertical rhythm: parent of BeatDisplay uses `gap-4`; cells use `py-2` — bump padding so
 * html2canvas matches the relaxed on-screen beat block.
 */
const CLONE_HIDE_16THS_CSS = `
.BeatDisplay .Counts .Count:nth-of-type(even),
.BeatDisplay .Cymbals .Cymbal:nth-of-type(even),
.BeatDisplay .Snares .Snare:nth-of-type(even),
.BeatDisplay .Kicks .Kick:nth-of-type(even) {
	display: none !important;
}
.BeatDisplay {
	display: flex !important;
	flex-direction: column !important;
	gap: 1rem !important;
}
.BeatDisplay .Counts {
	padding-top: 10px;
	padding-bottom: 10px;
	min-height: 44px;
	box-sizing: border-box;
}
.BeatDisplay .Cymbals .Cymbal,
.BeatDisplay .Snares .Snare,
.BeatDisplay .Kicks .Kick {
	padding-top: 12px !important;
	padding-bottom: 12px !important;
	box-sizing: border-box;
}
`;

function SaveScreenshot() {
	async function handleSaveScreenshot() {
		const beatDisplayElement = document.querySelector(
			'.BeatDisplay'
		) as HTMLElement;
		if (!beatDisplayElement) {
			alert('Beat Display not found.');
			return;
		}

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
				scale: 1,
				onclone: (clonedDoc, clonedElement) => {
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
							// Cross-origin or read-only stylesheets
						}
					}

					const root = clonedElement as HTMLElement;

					const fixIcons = () => {
						const instruments = ['Cymbals', 'Snares', 'Kicks'] as const;
						for (const gridClass of instruments) {
							const grid = root.querySelector(`.${gridClass}`);
							if (!grid) continue;
							grid.querySelectorAll('.IconButton').forEach((btn) => {
								const el = btn as HTMLElement;
								el.style.width = `${iconSize}px`;
								el.style.height = `${iconSize}px`;
								el.style.maxWidth = `${iconSize}px`;
								el.style.maxHeight = `${iconSize}px`;
								el.style.minWidth = `${iconSize}px`;
								el.style.minHeight = `${iconSize}px`;
								el.style.boxSizing = 'border-box';
								el.style.marginLeft = 'auto';
								el.style.marginRight = 'auto';
							});
							grid.querySelectorAll('.Icon').forEach((icon) => {
								const el = icon as HTMLImageElement;
								el.style.width = `${iconSize}px`;
								el.style.height = `${iconSize}px`;
								el.style.maxWidth = `${iconSize}px`;
								el.style.maxHeight = `${iconSize}px`;
								el.style.objectFit = 'contain';
							});
						}
					};

					// Hidden 16ths: match on-screen layout (grid + nth-of-type(even) hidden), not a custom flex rewrite.
					if (!isDisplaying16ths) {
						const tag = clonedDoc.createElement('style');
						tag.setAttribute('data-screenshot-hide-16ths', '');
						tag.textContent = CLONE_HIDE_16THS_CSS;
						clonedDoc.head.appendChild(tag);

						root.style.width = `${targetWidth}px`;
						root.style.maxWidth = `${targetWidth}px`;
						root.style.boxSizing = 'border-box';

						const counts = root.querySelector('.Counts') as HTMLElement;
						if (counts) {
							counts.style.fontSize = `${fontSize}px`;
							counts.querySelectorAll('.Count').forEach((cell) => {
								const el = cell as HTMLElement;
								el.style.color = '#111827';
							});
						}

						fixIcons();
						return;
					}

					// Showing 16ths: fixed-width flex layout (html2canvas is more reliable here than grid for some builds).
					root.className = '';
					root.style.cssText = '';
					root.style.width = `${targetWidth}px`;
					root.style.display = 'flex';
					root.style.flexDirection = 'column';
					root.style.gap = '0';
					root.style.boxSizing = 'border-box';
					root.style.margin = '0';
					root.style.padding = '0';

					const rowBase: Partial<CSSStyleDeclaration> = {
						display: 'flex',
						flexDirection: 'row',
						flexWrap: 'nowrap',
						alignItems: 'stretch',
						justifyContent: 'flex-start',
						width: `${targetWidth}px`,
						boxSizing: 'border-box',
						margin: '0',
						padding: '0',
					};

					const setCellWidth = (el: HTMLElement) => {
						el.style.flex = `0 0 ${cellWidth}px`;
						el.style.flexShrink = '0';
						el.style.flexGrow = '0';
						el.style.width = `${cellWidth}px`;
						el.style.minWidth = `${cellWidth}px`;
						el.style.maxWidth = `${cellWidth}px`;
					};

					const counts = root.querySelector('.Counts') as HTMLElement;
					if (counts) {
						counts.className = '';
						Object.assign(counts.style, rowBase);
						counts.style.height = `${countsHeight}px`;
						counts.style.borderBottom = '1px solid #e5e7eb';

						counts.querySelectorAll('.Count').forEach((cell) => {
							const el = cell as HTMLElement;
							el.className = '';
							el.style.cssText = '';
							setCellWidth(el);
							el.style.height = `${countsHeight}px`;
							el.style.display = 'flex';
							el.style.alignItems = 'center';
							el.style.justifyContent = 'center';
							el.style.boxSizing = 'border-box';
							el.style.margin = '0';
							el.style.padding = '0';
							el.style.fontSize = `${fontSize}px`;
							el.style.lineHeight = '1';
							el.style.color = '#111827';
						});
					}

					const instruments: [string, string][] = [
						['Cymbals', 'Cymbal'],
						['Snares', 'Snare'],
						['Kicks', 'Kick'],
					];
					for (const [gridClass, cellClass] of instruments) {
						const grid = root.querySelector(`.${gridClass}`) as HTMLElement;
						if (!grid) continue;

						grid.className = '';
						Object.assign(grid.style, rowBase);
						grid.style.height = `${rowHeight}px`;

						grid.querySelectorAll(`.${cellClass}`).forEach((cell) => {
							const el = cell as HTMLElement;
							el.className = '';
							el.style.cssText = '';
							setCellWidth(el);
							el.style.height = `${rowHeight}px`;
							el.style.display = 'flex';
							el.style.alignItems = 'center';
							el.style.justifyContent = 'center';
							el.style.boxSizing = 'border-box';
							el.style.margin = '0';
							el.style.padding = '8px 0';
						});

						grid.querySelectorAll('.IconButton').forEach((btn) => {
							const el = btn as HTMLElement;
							el.className = '';
							el.style.cssText = '';
							el.style.width = `${iconSize}px`;
							el.style.height = `${iconSize}px`;
							el.style.maxWidth = `${iconSize}px`;
							el.style.maxHeight = `${iconSize}px`;
							el.style.minWidth = `${iconSize}px`;
							el.style.minHeight = `${iconSize}px`;
							el.style.display = 'flex';
							el.style.alignItems = 'center';
							el.style.justifyContent = 'center';
							el.style.boxSizing = 'border-box';
							el.style.margin = '0 auto';
							el.style.padding = '0';
							el.style.border = '0';
							el.style.background = 'transparent';
						});

						grid.querySelectorAll('.Icon').forEach((icon) => {
							const el = icon as HTMLImageElement;
							el.className = '';
							el.style.cssText = '';
							el.style.width = `${iconSize}px`;
							el.style.height = `${iconSize}px`;
							el.style.maxWidth = `${iconSize}px`;
							el.style.maxHeight = `${iconSize}px`;
							el.style.display = 'block';
							el.style.margin = '0 auto';
							el.style.objectFit = 'contain';
						});
					}
				},
			});

			const dataUri = canvas.toDataURL('image/png');
			const linkElement = document.createElement('a');
			linkElement.setAttribute('href', dataUri);
			linkElement.setAttribute('download', 'beat.png');
			linkElement.click();
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
