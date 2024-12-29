import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { Spaces } from "./spaces";
import { usersTable } from "./users";
import { relations } from "drizzle-orm";
import { CommentTable } from "./comments";



export const PostTable = pgTable("posts", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    space_id: integer("space_id").notNull().references(() => Spaces.id),
    user_id: integer("user_id").notNull().references(() => usersTable.id),
    content: text("content").notNull(),
    created_at: timestamp("created_at").defaultNow(),
    updated_at: timestamp("updated_at").defaultNow()
})


export const postsRelations = relations(PostTable, ({one, many}) => ({
    space: one(Spaces, {
        fields: [PostTable.space_id],
        references: [Spaces.id]
    }),
    user: one(usersTable, {
        fields: [PostTable.user_id],
        references: [usersTable.id]
    }),
    comments: many(CommentTable),
}));