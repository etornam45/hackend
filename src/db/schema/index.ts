import { CommentTable } from "./comments"
import { CompetitionParticipants } from "./competition_participants"
import { competitionsTable } from "./competitions"
import { GroupTable } from "./group"
import { GroupMemberTable } from "./group-member"
import { PostTable } from "./posts"
import { Spaces } from "./spaces"
import { usersTable } from "./users"

export const table = {
	usersTable,
    Spaces,
    PostTable,
    GroupTable,
    GroupMemberTable,
    competitionsTable,
    CompetitionParticipants,
    CommentTable
} as const

export type Table = typeof table