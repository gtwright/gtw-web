import { beethoven } from '@/lib/schema'
import configPromise from '@/payload.config'
import { getPayload } from 'payload'
import { sql, ilike } from 'drizzle-orm'

type PerformanceData = {
    work: string;
    season_start: number;
    season_end: number;
    conductor: string;
    performances: number;
    season: string;
  };
  
  type PerformanceResult =
    | {
        success: true;
        data: PerformanceData[];
      }
    | {
        success: false;
        error: string;
      };

export const fetchPerformances = async (conductor: string): Promise<PerformanceResult> => {
  const payload = await getPayload({ config: configPromise })
  try {
    const query = await payload.db.drizzle.select({
      // @ts-expect-error Schema type mismatch
      work: beethoven.work,
  // @ts-expect-error Schema type mismatch
    conductor: beethoven.conductor,
  // @ts-expect-error Schema type mismatch
    season_start: beethoven.season_start,
  // @ts-expect-error Schema type mismatch
    season_end: beethoven.season_end,
    // @ts-expect-error Schema type mismatch
    performances: sql`count(*)::integer`.as("performances"),
  // @ts-expect-error Schema type mismatch
    season:
      sql<string>`${beethoven.season_start}::text || ' - ' || ${beethoven.season_end}::text`.as(
        "season"
      ),
  })
  // @ts-expect-error Schema type mismatch

  .from(beethoven)
  .where(
  // @ts-expect-error Schema type mismatch

    conductor && conductor !== "all"
      ? ilike(beethoven.conductor, `%${conductor}%`)
      : undefined
  )
  .groupBy(
  // @ts-expect-error Schema type mismatch
    beethoven.work,
    beethoven.season_start,
    beethoven.season_end,
    beethoven.conductor
  ) 
  // @ts-expect-error Schema type mismatch
  .orderBy(beethoven.work);
  return {
    success: true,
    data: query as PerformanceData[],
  }
} catch (error) {
  return {
    success: false,
    error: error instanceof Error ? error.message : 'An unknown error occurred',
  }
}
}