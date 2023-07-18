/**
 * Converts a given text into a URL-friendly slug format.
 * @param text - The input text to be converted into a slug.
 * @returns The slug version of the input text.
 */
export const makeSlug = (text: string) => {
	return text
		.toLowerCase()
		.replace(/[A-Z]/g, '-' + '$&'.toLowerCase())
		.replace(/ /g, '-');
};

export const msToTime = (duration: number): string => {
	let seconds = Math.floor((duration / 1000) % 60);
	let minutes = Math.floor((duration / (1000 * 60)) % 60);

	let minutesText = minutes < 10 ? '0' + minutes : minutes;
	let secondsText = seconds < 10 ? '0' + seconds : seconds;

	return minutesText + ':' + secondsText;
};
