import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { competitionsTable } from "./competitions";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { GroupMemberTable } from "./group-member";


export const GroupTable = pgTable("groups", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    competition_id: integer("competition_id").references(() => competitionsTable.id),
    name: varchar("name", {length: 255}).notNull(),
    description: text("description"),
    created_by: integer("created_by").notNull().references(() => usersTable.id),
    created_at: timestamp("created_at").defaultNow()
})

export const groupsRelations = relations(GroupTable, ({one, many}) => ({
    competition: one(competitionsTable, {
        fields: [GroupTable.competition_id],
        references: [competitionsTable.id]
    }),
    user: one(usersTable, {
        fields: [GroupTable.created_by],
        references: [usersTable.id]
    }),
    groupMembers: many(GroupMemberTable),
}));