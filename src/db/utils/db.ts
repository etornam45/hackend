import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox'
import { table } from '../schema'
import { t } from 'elysia'

export const t_db = {
    insert: {
        user: createInsertSchema(table.usersTable, {
            email: t.String({ format: "email", error: "No email value found" }),
        }),
        spaces: createInsertSchema(table.Spaces),
        competitions: createInsertSchema(table.competitionsTable),
        competition_participants: createInsertSchema(table.CompetitionParticipants),
        groups: createInsertSchema(table.GroupTable),
    },
    select: {
        user: createSelectSchema(table.usersTable),
        spaces: createSelectSchema(table.Spaces),
        competitions: createSelectSchema(table.competitionsTable),
        competition_participants: createSelectSchema(table.CompetitionParticipants),
        groups: createSelectSchema(table.GroupTable),
    },
    update: {
        user: createUpdateSchema(table.usersTable),
        spaces: createUpdateSchema(table.Spaces),
        competitions: createUpdateSchema(table.competitionsTable),
        competition_participants: createUpdateSchema(table.CompetitionParticipants),
        groups: createUpdateSchema(table.GroupTable),
    }
} as const