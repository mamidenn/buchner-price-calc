import { getPrices } from '$lib/priceCalculations';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		return getPrices(formData);
	}
};
