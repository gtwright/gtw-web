import { pgTable, serial, integer, text } from "drizzle-orm/pg-core";

export const beethoven = pgTable("beethoven", {
  id: serial("id").primaryKey(),
  work: text("work").notNull(),
  season_start: integer("season_start").notNull(),
  season_end: integer("season_end").notNull(),
  conductor: text("conductor").notNull(),
});

export type Performance = typeof beethoven.$inferSelect;
