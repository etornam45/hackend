import { integer, pgEnum, pgTable, timestamp, unique } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { competitionsTable } from "./competitions";

export const CompetitionParticipantsStatus = pgEnum('competition_participants_status', ["Registered", "Active", "Withdrawn"])

export const CompetitionParticipants = pgTable('competition_participants', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer('user_id').references(() => usersTable.id),
    competition_id: integer('competition_id').references(() => competitionsTable.id),
    joined_at: timestamp("joined_at").defaultNow(),
    status: CompetitionParticipantsStatus('status').default("Registered")
}, (t) => [unique('user_single_comp').on(t.user_id, t.competition_id)]
)


export const CompetitionParticipantsRelation = relations(CompetitionParticipants, ({ one }) => ({
    user: one(usersTable, {
        fields: [CompetitionParticipants.user_id],
        references: [usersTable.id],
    }),
    competitoion: one(competitionsTable, {
        fields: [CompetitionParticipants.competition_id],
        references: [competitionsTable.id]
    })
}))