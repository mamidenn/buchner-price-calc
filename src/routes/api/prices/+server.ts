import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ url }) => {
	const filter = url.searchParams.get('f');
	console.log(filter);
	return json({
		"Grimm's Märchen": {
			a: 500
		}
	});
};
