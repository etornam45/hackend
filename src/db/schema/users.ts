import { relations } from "drizzle-orm";
import { text, pgTable, integer, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { GroupTable } from "./group";
import { Spaces } from "./spaces";
import { competitionsTable } from "./competitions";
import { CompetitionParticipants } from "./competition_participants";
import { PostTable } from "./posts";
import { CommentTable } from "./comments";
import { GroupMemberTable } from "./group-member";

export const AccountStatus = pgEnum('account_status', ['active', 'suspended', 'banned'])

export const usersTable = pgTable("users", {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    username: varchar('username',{ length: 255 }).notNull().unique(),
    email: varchar('email',{ length: 255 }).notNull().unique(),
    password_hash: varchar('password_hash').notNull(),
    first_name: varchar('first_name',{length: 255}),
    last_name: varchar('last_name', {length: 255}),
    profile_picture_url: varchar("profile_picture_url", {length: 255}),
    bio: text("bio"),
    location: varchar("location", {length: 255}),
    skills: text("skills"),
    registration_date: timestamp("registration_date").defaultNow(),
    last_login: timestamp("last_login").defaultNow(),
    account_status: AccountStatus("account_status").default('active')
});

export const usersRelations = relations(usersTable, ({many}) => ({
    groups: many(GroupTable),
    spaces: many(Spaces),
    competitions: many(competitionsTable),
    competitionParticipants: many(CompetitionParticipants),
    posts: many(PostTable),
    comments: many(CommentTable),
    groupMembers: many(GroupMemberTable),
}));