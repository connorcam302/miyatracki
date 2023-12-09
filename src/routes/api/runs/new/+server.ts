import { customResponse } from '$lib/CustomResponse';
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { runsTable } from '$lib/server/schema';

type NewRun = typeof runsTable.$inferInsert;

export const POST: RequestHandler = async ({ url }) => {
	console.log(url.pathname, 'requested.');

	const newRun: NewRun = {
		runUser: Number(url.searchParams.get('id')),
		gameId: Number(url.searchParams.get('game')),
		experience: Number(url.searchParams.get('experience')),
		runName: url.searchParams.get('name') ?? 'Unnamed',
		runStartDate: Date.now()
	};

	try {
		await db.insert(runsTable).values(newRun);
		return json(customResponse(201, `Run ${newRun.runName} created.`, [newRun]));
	} catch (error) {
		return json(customResponse(500, `Error creating run ${newRun.runName}.`));
	}
};
