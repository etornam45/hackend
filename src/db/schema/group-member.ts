import { integer, pgEnum, pgTable, timestamp, unique } from "drizzle-orm/pg-core";
import { GroupTable } from "./group";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";

export const GroupMemberRole = pgEnum("group_member_role", ["Member","Leader","Admin"])

export const GroupMemberTable = pgTable("group_members", {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    group_id: integer("group_id").notNull().references(() => GroupTable.id),
    user_id: integer("user_id").notNull().references(() => usersTable.id),
    joined_at: timestamp("joined_at").defaultNow(),
    role: GroupMemberRole("role").default("Member")
}, (t) => [
    unique("group_user").on(t.group_id, t.user_id)
])


export const groupMembersRelations = relations(GroupMemberTable, ({one}) => ({
    group: one(GroupTable, {
        fields: [GroupMemberTable.group_id],
        references: [GroupTable.id]
    }),
    user: one(usersTable, {
        fields: [GroupMemberTable.user_id],
        references: [usersTable.id]
    }),
}));