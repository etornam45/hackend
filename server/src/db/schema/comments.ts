import { AnyPgColumn, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { PostTable } from "./posts";
import { usersTable } from "./users";
import { aliasedTable, relations } from "drizzle-orm";

export const CommentTable = pgTable("comment", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    post_id: integer("post_id").notNull().references(() => PostTable.id),
    user_id: integer("user_id").notNull().references(() => usersTable.id),
    contnent: text("contnent").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at") .defaultNow(),
    parent_comment: integer("parent_comment").references((): AnyPgColumn => CommentTable.id),
})

export const CommentRelations = relations(CommentTable, ({many, one}) => ({
    replies: many(CommentTable),
    parentComment: one(CommentTable, {
        fields: [CommentTable.parent_comment],
        references: [CommentTable.id]
    }),
    user: one(usersTable, {
        fields: [CommentTable.id],
        references: [usersTable.id]
    }),
    post: one(PostTable, {
        fields: [CommentTable.post_id],
        references: [PostTable.id]
    }),
}))