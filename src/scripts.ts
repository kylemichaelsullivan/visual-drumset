export function getBackgroundClass(j: number) {
	const bgClass = ['bg-gray-300', 'bg-gray-100', 'bg-gray-200', 'bg-gray-100'];
	return bgClass[j % 4];
}

export function getSubdivision(j: number): string {
	const subdivisions = ['', '-e', '-&', '-a'];
	return subdivisions[j];
}

export function getButtonClass(isShort = false): string {
	return `bg-gray-100 border border-black ${isShort ? 'px-2' : 'px-4 py-2'} transition-colors duration-300 hover:bg-gray-300 hover:ring-1`;
}
