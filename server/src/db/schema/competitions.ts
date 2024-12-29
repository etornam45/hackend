import { integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { GroupTable } from "./group";
import { Spaces } from "./spaces";
import { CompetitionParticipants } from "./competition_participants";

export const competitionStatus = pgEnum('competition_status', ["draft", "open", "in_progress", "judging", "completed"])
export const deficultyLevel = pgEnum("deficulty_level", ["beginner", "intermediate", "advanced"])

export const competitionsTable = pgTable('competition', {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    host_id: integer("host_id").references(() => usersTable.id),
    name: text('name').notNull(),
    description: text("description"),
    start_date: timestamp("start_date"),
    end_date: timestamp("end_date"),
    submission_deadline: timestamp("submission_deadline"),
    rules: text('rules'),
    prize_description: text('prize_description'),
    max_team_size: integer("max_team_size").notNull(),
    creation_date: timestamp("creation_date").defaultNow(),
    status: competitionStatus("status").default("draft"),
    difficulty_level: deficultyLevel('difficulty_level').notNull()
})


export const competitionsRelations = relations(competitionsTable, ({many, one}) => ({
    host: one(usersTable, {
        fields: [competitionsTable.host_id],
        references: [usersTable.id]
    }),
    groups: many(GroupTable),
    spaces: many(Spaces),
    participants: many(CompetitionParticipants),
}))