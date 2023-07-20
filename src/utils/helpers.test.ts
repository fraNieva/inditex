import { makeSlug, msToTime } from './helpers';

describe('makeSlug function', () => {
	it('converts text to a URL-friendly slug format', () => {
		const inputText = 'Convert This Text';
		const expectedSlug = 'convert-this-text';
		const result = makeSlug(inputText);
		expect(result).toBe(expectedSlug);
	});

	it('replaces special characters with hyphens', () => {
		const inputText = 'Where Should We Begin? with Esther Perel';
		const expectedSlug = 'where-should-we-begin--with-esther-perel';
		const result = makeSlug(inputText);
		expect(result).toBe(expectedSlug);
	});
});

describe('msToTime function', () => {
	it('converts milliseconds to a formatted time string', () => {
		const duration = 123456;
		const expectedTimeString = '02:03';
		const result = msToTime(duration);
		expect(result).toBe(expectedTimeString);
	});

	it('pads single-digit minutes and seconds with leading zeros', () => {
		const duration = 60000;
		const expectedTimeString = '01:00';
		const result = msToTime(duration);
		expect(result).toBe(expectedTimeString);
	});
});
