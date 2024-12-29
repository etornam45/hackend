import { boolean, integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { competitionsTable } from "./competitions";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { PostTable } from "./posts";


export const Spaces = pgTable('spaces', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    competition_id: integer('competition_id').notNull().references(() => competitionsTable.id),
    title: varchar("title",{
        length: 100,
    }).default("Untitled Space"),
    description: text('description'),
    is_public: boolean("is_public"),
    created_by: integer('created_by').notNull().references(() => usersTable.id),
    created_at: timestamp("created_at").defaultNow()
})

export const spacesRelations = relations(Spaces, ({one, many}) => ({
    competition: one(competitionsTable, {
        fields: [Spaces.competition_id],
        references: [competitionsTable.id]
    }),
    user: one(usersTable, {
        fields: [Spaces.created_by],
        references: [usersTable.id]
    }),
    posts: many(PostTable),
}));