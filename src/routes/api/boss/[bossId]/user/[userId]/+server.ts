import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/database';
import { bossRatingsTable } from '$lib/server/schema';
import { customResponse } from '$lib/CustomResponse';
import { and, eq } from 'drizzle-orm';

export const GET: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const bossId = Number(params.bossId);
	const userId = Number(params.userId);

	try {
		const dataArray = await db
			.select()
			.from(bossRatingsTable)
			.where(and(eq(bossRatingsTable.bossId, bossId), eq(bossRatingsTable.userId, userId)));

		if (dataArray.length === 0) {
			return json(customResponse(204, 'No data found.', []));
		} else {
			return json(customResponse(200, 'Ok', dataArray));
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};

export const POST: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const bossId = Number(params.bossId);
	const userId = Number(params.userId);

	const parseRating = (rating: string) => {
		if (rating === 'null') {
			return null;
		} else {
			return Number(rating);
		}
	};

	const difficulty = parseRating(url.searchParams.get('difficulty'));
	const enjoyment = parseRating(url.searchParams.get('enjoyment'));

	console.log(difficulty, enjoyment);
	try {
		const dataArray = await db
			.select()
			.from(bossRatingsTable)
			.where(and(eq(bossRatingsTable.bossId, bossId), eq(bossRatingsTable.userId, userId)));

		if (dataArray.length > 0) {
			await db
				.update(bossRatingsTable)
				.set({
					difficultyRating: difficulty,
					enjoymentRating: enjoyment,
					timestamp: Date.now().toString()
				})
				.where(and(eq(bossRatingsTable.bossId, bossId), eq(bossRatingsTable.userId, userId)));
			console.log('Rating updated.');
			return json(customResponse(200, 'Ok'));
		} else {
			await db.insert(bossRatingsTable).values({
				bossId: bossId,
				userId: userId,
				difficultyRating: difficulty,
				enjoymentRating: enjoyment,
				timestamp: Date.now().toString()
			});
			console.log('Rating added.');
			return json(customResponse(200, 'Ok'));
		}
	} catch (error) {
		console.error('Error fetching users:', error);
		return json(customResponse(500, 'Internal Server Error'));
	}
};
