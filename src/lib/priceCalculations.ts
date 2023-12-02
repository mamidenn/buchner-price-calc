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
export const calculatePrice = (
	printPrice: number,
	amount: number,
	duration: number,
	hasAccount: boolean
) => {
	const price = digitalPrice(printPrice);
	const discount =
		discountAmount(amount) + discountDuration(duration) + discountAccount(hasAccount);
	return {
		unit: price * (1 - discount),
		discountAmount: discountAmount(amount),
		discountDuration: discountDuration(duration),
		discountAccount: discountAccount(hasAccount),
		discount,
		overall: amount * duration * price * (1 - discount)
	};
};
