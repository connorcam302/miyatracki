import { customResponse } from '$lib/CustomResponse';
import { getExperienceTitle } from '$lib/functions';
import { db } from '$lib/server/database';
import { gamesTable, runsTable, userTable } from '$lib/server/schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq, like, or } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url }) => {
	console.log(url.pathname, 'requested.');
	const terms = url.searchParams.get('terms');

	if (typeof terms === 'undefined') {
		return json(customResponse(400, 'Please provide search terms.'));
	}

	try {
		const dataArray = await db
			.select()
			.from(runsTable)
			.where(or(like(runsTable.runName, `%${terms}%`), like(userTable.displayName, `%${terms}%`)))
			.innerJoin(gamesTable, eq(runsTable.gameId, gamesTable.gameId))
			.innerJoin(userTable, eq(runsTable.runUser, userTable.id));

		if (dataArray.length === 0) {
			return json(customResponse(204, `No runs found.`, []));
		} else {
			const data = dataArray.map((run) => {
				return {
					id: run.Runs.runId,
					name: run.Runs.runName,
					username: run.User.displayName,
					userId: run.User.id,
					profilePicture: run.User.profilePicture,
					game: run.Games.gameTitle,
					gameId: run.Games.gameId,
					experienceTitle: getExperienceTitle(run.Runs.experience).title,
					experienceColour: getExperienceTitle(run.Runs.experience).colour
				};
			});

			return json(customResponse(200, 'Ok', data));
		}
	} catch (error) {
		console.error('Error fetching runs:', error);
		return json(customResponse(500, `Internal Server Error ${error}`));
	}
};
