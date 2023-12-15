import { db } from '$lib/server/database';
import { bossRatingsTable, bossesTable } from '$lib/server/schema';
import { eq } from 'drizzle-orm';

export const load = async ({ params }) => {
	const { id } = params;

	const bossData = await db.select().from(bossesTable).where(eq(bossesTable.bossId, id));

	const boss = {
		...bossData[0]
	};

	return { boss };
};
