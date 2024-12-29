import { PostTable } from "@/db/schema/posts";
import { t_db } from "@/db/utils/db";
import { AuthenticationPlugin } from "@/plugins/authentication";
import { db } from "@/utils/db";
import { getErrorMessage } from "@/utils/error-codes";
import { d } from "drizzle-kit/index-Z-1TKnbX";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

/**
 * ### Post Management
    - [x] POST /spaces/:space_id/posts
    - [x] GET /spaces/:space_id/posts
    - [x] GET /posts/:post_id
    - [x] PUT /posts/:post_id
    - [x] DELETE /posts/:post_id
 */

export const posts = new Elysia({
    tags: ['Posts']
})
    .use(AuthenticationPlugin)
    .post("/spaces/:space_id/posts", async ({ params: { space_id }, body, set, user }) => {
        const newPost = await db.insert(PostTable).values({ ...body, space_id: space_id, user_id: Number(user?.id) }).returning();

        if (newPost.length === 0) {
            set.status = 400
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_001"),
                message: "Failed to add post to space",
                data: newPost
            }
        }

        return {
            message: "Post added to space successfully",
            data: newPost[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            space_id: t.Number()
        }),
        body: t.Omit(t_db.insert.posts, ["space_id", "user_id", "created_at", "updated_at"]),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.posts
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .get("/spaces/:space_id/posts", async ({ params: { space_id } }) => {
        const posts = await db.select().from(PostTable).where(eq(PostTable.space_id, space_id))
        return { data: posts }
    }, {
        isSignIn: false,
        params: t.Object({
            space_id: t.Number()
        }),
    })
    .get("/posts/:post_id", async ({ params: { post_id }, set }) => {
        const post = await db.select().from(PostTable).where(eq(PostTable.id, post_id))

        if (post.length === 0) {
            set.status = 404
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_002"),
                message: "Post not found",
                data: post
            }
        }

        return { 
            message: "Post fetched successfully",
            data: post[0] 
        }
    }, {
        isSignIn: false,
        params: t.Object({
            post_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.posts
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .put("/posts/:post_id", async ({ params: { post_id }, body }) => { 
        const updatedPost = await db.update(PostTable).set(body).where(eq(PostTable.id, post_id)).returning();

        if (updatedPost.length === 0) {
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_003"),
                message: "Failed to update post",
                data: updatedPost
            }
        }

        return {
            message: "Post updated successfully",
            data: updatedPost[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            post_id: t.Number()
        }),
        body: t.Omit(t_db.update.posts, ["space_id", "user_id", "created_at", "updated_at"]),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.posts
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .delete("/posts/:post_id", async ({ params: { post_id } }) => {
        const deletedPost = await db.delete(PostTable).where(eq(PostTable.id, post_id)).returning();

        if (deletedPost.length === 0) {
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_004"),
                message: "Failed to delete post",
                data: deletedPost
            }
        }

        return {
            message: "Post deleted successfully", 
            data: deletedPost[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            post_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.posts
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })