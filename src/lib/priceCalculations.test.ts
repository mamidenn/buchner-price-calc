import { describe, it, expect } from 'vitest';
import { digitalPrice } from './priceCalculations';

describe('digitalPrice', () => {
	it.each`
		print     | digital
		${-1}     | ${6.5}
		${0.01}   | ${6.5}
		${19.99}  | ${6.5}
		${20}     | ${7.5}
		${27.5}   | ${7.5}
		${27.51}  | ${8.5}
		${35.0}   | ${8.5}
		${35.01}  | ${9.5}
		${999.99} | ${9.5}
	`('calculates the correct digital price ($print => $digital)', ({ print, digital }) => {
		expect(digitalPrice(print as number)).toBe(digital);
	});
});
