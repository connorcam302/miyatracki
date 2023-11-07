import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = ({ url }) => {
	console.log(url.pathname, 'requested.');

	return json({
		body: {
			message: 'Hello world!'
		}
	});
};
