export function getBackgroundClass(j: number) {
	const bgClass = ["bg-gray-300", "bg-gray-100", "bg-gray-200", "bg-gray-100"];
	return bgClass[j % 4];
}

export function getSubdivision(j: number): string {
	const subdivisions = ["", "-e", "-&", "-a"];
	return subdivisions[j];
}
