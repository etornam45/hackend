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
        group_members: createInsertSchema(table.GroupMemberTable),
        posts: createInsertSchema(table.PostTable),
        comments: createInsertSchema(table.CommentTable)
    },
    select: {
        user: createSelectSchema(table.usersTable),
        spaces: createSelectSchema(table.Spaces),
        competitions: createSelectSchema(table.competitionsTable),
        competition_participants: createSelectSchema(table.CompetitionParticipants),
        groups: createSelectSchema(table.GroupTable),
        group_members: createSelectSchema(table.GroupMemberTable),
        posts: createSelectSchema(table.PostTable),
        comments: createSelectSchema(table.CommentTable),
    },
    update: {
        user: createUpdateSchema(table.usersTable),
        spaces: createUpdateSchema(table.Spaces),
        competitions: createUpdateSchema(table.competitionsTable),
        competition_participants: createUpdateSchema(table.CompetitionParticipants),
        groups: createUpdateSchema(table.GroupTable),
        group_members: createUpdateSchema(table.GroupMemberTable),
        posts: createUpdateSchema(table.PostTable),
        comments: createUpdateSchema(table.CommentTable),
    }
} as const