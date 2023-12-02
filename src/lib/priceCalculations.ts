import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const digitalPrice = (printPrice: number) => {
	if (printPrice < 20) return 6.5;
	if (printPrice <= 27.5) return 7.5;
	if (printPrice <= 35) return 8.5;
	return 9.5;
};
export const discountAmount = (amount: number) => {
	if (amount < 25) return 0;
	if (amount < 50) return 0.025;
	if (amount < 100) return 0.05;
	if (amount < 200) return 0.075;
	if (amount < 500) return 0.1;
	if (amount < 1000) return 0.125;
	return 0.15;
};
export const discountDuration = (duration: number) => {
	if (duration <= 1) return 0;
	if (duration <= 2) return 0.025;
	if (duration <= 3) return 0.05;
	if (duration <= 4) return 0.075;
	if (duration <= 5) return 0.1;
	return 0.125;
};
export const discountAccount = (hasAccount: boolean) => {
	return hasAccount ? 0.2 : 0;
};
export const calculatePrice = (data: {
	'price-print': number;
	amount: number;
	duration: number;
	'has-account': boolean;
}) => {
	const price = digitalPrice(data['price-print']);
	const discount =
		discountAmount(data.amount) +
		discountDuration(data.duration) +
		discountAccount(data['has-account']);
	return {
		unit: price * (1 - discount),
		discountAmount: discountAmount(data.amount),
		discountDuration: discountDuration(data.duration),
		discountAccount: discountAccount(data['has-account']),
		discount,
		overall: data.amount * data.duration * price * (1 - discount)
	};
};

const formSchema = zfd.formData({
	'price-print': zfd.numeric(z.number().min(0)),
	amount: zfd.numeric(z.number().int().min(1)),
	duration: zfd.numeric(z.number().int().min(1).max(6)),
	'has-account': zfd.checkbox()
});

export const getPrices = (formData: FormData) => {
	const result = formSchema.safeParse(formData);
	if (!result.success) {
		return fail(400, { error: result.error.flatten() });
	}
	return {
		...result.data,
		result: calculatePrice(result.data)
	};
};
