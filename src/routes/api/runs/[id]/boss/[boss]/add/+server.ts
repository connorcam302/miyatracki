import { customResponse } from '$lib/CustomResponse';
import { json, type RequestHandler } from '@sveltejs/kit';
import { db } from '$lib/server/database';
import { bossDeathsInRunTable, runsTable } from '$lib/server/schema';
import { eq, and } from 'drizzle-orm';

export const POST: RequestHandler = async ({ url, params }) => {
	console.log(url.pathname, 'requested.');
	const boss = Number(params.boss);
	const id = Number(params.id);

	const runExists = await db.select().from(runsTable).where(eq(runsTable.runId, id));

	if (runExists.length == 0) {
		return json(customResponse(404, `Run ${id} does not exist.`));
	}

	const bossDeathsCurrent = await db
		.select()
		.from(bossDeathsInRunTable)
		.where(and(eq(bossDeathsInRunTable.runId, id), eq(bossDeathsInRunTable.bossId, boss)));

	if (bossDeathsCurrent.length > 0 && bossDeathsCurrent[0].deathDate !== null) {
		return json(customResponse(400, `Boss ${boss} is already dead.`));
	}

	if (bossDeathsCurrent.length == 0) {
		const data = await db
			.insert(bossDeathsInRunTable)
			.values({
				runId: id,
				bossId: boss,
				deathCount: 1
			})
			.returning();
		return json(customResponse(200, 'Created boss death.', [data]));
	}

	const data = await db
		.update(bossDeathsInRunTable)
		.set({ deathCount: bossDeathsCurrent[0].deathCount + 1 })
		.where(and(eq(bossDeathsInRunTable.runId, id), eq(bossDeathsInRunTable.bossId, boss)))
		.returning();
	return json(customResponse(200, `Updated boss death count.`, [data]));
};
