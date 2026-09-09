import { pgTable, integer, text, date, uuid } from '@payloadcms/db-vercel-postgres/drizzle/pg-core'

export const beethoven = pgTable('beethoven', {
  id: uuid('id').primaryKey().defaultRandom(),
  work: text('work').notNull(),
  season_start: integer('season_start').notNull(),
  season_end: integer('season_end').notNull(),
  conductor: text('conductor').notNull(),
  soloists: text('soloists'),
  venue: text('venue').notNull(),
  orchestra: text('orchestra').notNull(),
  composer: text('composer').notNull(),
  concert_year: integer('concert_year').notNull(),
  concert_month: integer('concert_month').notNull(),
  concert_day: integer('concert_day').notNull(),
  concert_date: date('concert_date').notNull(),
})

export type Performance = typeof beethoven.$inferSelect
