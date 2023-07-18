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
