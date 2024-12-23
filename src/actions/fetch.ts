import { beethoven } from '@/lib/schema'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'
import { sql, ilike } from '@payloadcms/db-vercel-postgres/drizzle'

export const fetchPerformances = async (conductor: string) => {
  const payload = await getPayload({ config: configPromise })
  try {
    const query = await payload.db.drizzle.select({
      work: beethoven.work,
    conductor: beethoven.conductor,
    season_start: beethoven.season_start,
    season_end: beethoven.season_end,
    performances: sql`count(*)::integer`.as("performances"),
    season:
      sql`${beethoven.season_start}::text || ' - ' || ${beethoven.season_end}::text`.as(
        "season"
      ),
  })

  .from(beethoven)
  .where(

    conductor && conductor !== "all"
      ? ilike(beethoven.conductor, `%${conductor}%`)
      : undefined
  )
  .groupBy(
    beethoven.work,
    beethoven.season_start,
    beethoven.season_end,
    beethoven.conductor
  ) 
  .orderBy(beethoven.work);
  return {
    success: true,
    data: query,
  }
} catch (error) {
  return {
    success: false,
    error: error instanceof Error ? error.message : 'An unknown error occurred',
  }
}
}

export async function fetchConductors() {
    const payload = await getPayload({ config: configPromise })
    try {
      const result = await payload.db.drizzle
        .select({ conductor: beethoven.conductor })
        .from(beethoven)
        .groupBy(beethoven.conductor)
        .orderBy(beethoven.conductor);
  
      return { success: true, data: result.map((item) => item.conductor) };
    } catch (error) {
      console.error("Database query error:", error);
      return { success: false, error: "Failed to fetch conductors" };
    }
  }


  