import { CommentTable, replies } from "@/db/schema/comments";
import { t_db } from "@/db/utils/db";
import { AuthenticationPlugin } from "@/plugins/authentication";
import { db } from "@/utils/db";
import { getErrorMessage } from "@/utils/error-codes";
import { aliasedTable, and, eq, isNull } from "drizzle-orm";
import Elysia, { t } from "elysia";


/**
 * ## Comments
    ### Comment Management
    - [x] POST /posts/:post_id/comments
    - [x] GET /posts/:post_id/comments
    - [x] GET /comments/:comment_id
    - [x] PUT /comments/:comment_id
    - [x] DELETE /comments/:comment_id
    - [x] POST /posts/:post_id/comments/:comment_id/replies
 */

export const comment_management = new Elysia({
    tags: ['Comment Management']
})
    .use(AuthenticationPlugin)
    .post("/posts/:post_id/comments", async ({ body, params, user, set }) => {
        const comment = await db.insert(CommentTable).values({
            ...body,
            post_id: params.post_id,
            user_id: Number(user?.id)
        }).returning()

        if (comment.length === 0) {
            set.status = 400
            return {
                ...getErrorMessage("COMMENT_ERRORS", "COMMENT_001"),
                message: "Failed to add comment",
                data: comment
            }
        }

        return {
            message: "Comment added successfully",
            data: comment[0]
        }
    }, {
        isSignIn: true,
        body: t.Omit(t_db.insert.comments, ["created_at", "updated_at", "user_id", "post_id"]),
        params: t.Object({
            post_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.comments
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .get("/posts/:post_id/comments", async ({ body, params, set, user }) => {
        
        const comments = await db.select()
        .from(CommentTable)
        .where(and(
            eq(CommentTable.post_id, params.post_id),
            isNull(CommentTable.parent_comment)
        ))

        if (comments.length === 0) {
            set.status = 404
            return {
                ...getErrorMessage("COMMENT_ERRORS", "COMMENT_002"),
                message: "Comments not found",
                data: comments
            }
        }

        return {
            message: "Comments fetched successfully",
            data: comments
        }
    }, {
        isSignIn: true,
        params: t.Object({
            post_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t.Array(t_db.select.comments)
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .get("/comments/:comment_id", async ({params: { comment_id }, set}) => {
        const replies = aliasedTable(CommentTable, "replies")
        const comment = await db.select()
        .from(CommentTable)
        .leftJoin(replies, eq(replies.id, CommentTable.parent_comment))
        .where(eq(CommentTable.id, comment_id))
        console.log(comment)
        if (comment.length === 0) {
            set.status = 404
            return {
                ...getErrorMessage("COMMENT_ERRORS", "COMMENT_003"),
                message: "Comment not found",
                data: comment
            }
        }

        return {
            message: "Comment fetched successfully",
            data: comment[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            comment_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t.Object({
                    comment: t_db.select.comments,
                    replies: t.Array(t_db.select.comments)
                })
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .put("/comments/:comment_id", async ({ body, params: { comment_id }, set }) => {
        const updatedComment = await db
            .update(CommentTable)
            .set({
                ...body
            })
            .where(eq(CommentTable.id, comment_id))
            .returning()

        if (updatedComment.length === 0) {
            set.status = 400
            return {
                ...getErrorMessage("COMMENT_ERRORS", "COMMENT_004"),
                message: "Failed to update comment",
                data: updatedComment
            }
        }

        return {
            message: "Comment updated successfully",
            data: updatedComment[0]
        }
    }, {
        isSignIn: true,
        body: t.Omit(t_db.update.comments, ["created_at", "updated_at", "user_id", "post_id", "parent_comment"]),
        params: t.Object({
            comment_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.comments
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .delete("/comments/:comment_id", async ({ params: { comment_id }, set }) => {
        const deletedComment = await db.delete(CommentTable).where(eq(CommentTable.id, comment_id)).returning()

        if (deletedComment.length === 0) {
            set.status = 400
            return {
                ...getErrorMessage("COMMENT_ERRORS", "COMMENT_005"),
                message: "Failed to delete comment",
                data: deletedComment
            }
        }

        return {
            message: "Comment deleted successfully",
            data: deletedComment
        }
    }, {
        isSignIn: true,
        params: t.Object({
            comment_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t.Array(t_db.select.comments)
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .post("/posts/:post_id/comments/:comment_id/replies", async ({body, params, set, user}) => {
        const comment = await db.insert(CommentTable).values({
            ...body,
            post_id: params.post_id,
            user_id: Number(user?.id),
            parent_comment: params.comment_id
        })
        .returning()

        if (comment.length === 0) {
            set.status = 400
            return {
                ...getErrorMessage("COMMENT_ERRORS", "COMMENT_006"),
                message: "Failed to reply to comment",
                data: comment
            }
        }

        return {
            message: "Comment replied successfully",
            data: comment[0]
        }
    },{
        isSignIn: true,
        body: t.Omit(t_db.insert.comments, ["created_at", "updated_at", "user_id", "post_id", "parent_comment"]),
        params: t.Object({
            comment_id: t.Number(),
            post_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.comments
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })