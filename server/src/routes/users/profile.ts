import { usersTable } from "$/db/schema/users";
import { t_db } from "$/db/utils/db";
import { AuthenticationPlugin } from "$/plugins/authentication";
import { db } from "$/utils/db";
import { getErrorMessage } from "$/utils/error-codes";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";


/**
TODO:
[x] GET /users/profile
[x] PUT /users/profile
[x] GET /users/{user_id}/profile
[ ] POST /users/skills
[ ] DELETE /users/skills/{skill}

*/

export const profile = new Elysia()
    .use(AuthenticationPlugin)
    .get('/profile', ({ user }) => user, { isSignIn: true })
    .put('/profile', async ({ user, body }) => {
        try {
            const updatedUser = await db.update(usersTable).set(body)
                .where(eq(usersTable.id, user?.id!))
                .returning()

            if (updatedUser.length === 0) {
                return {
                    ...getErrorMessage("USER_ERRORS", "USER_007"),
                    message: "Failed to update user profile"
                }
            }

            return {
                message: "User profile updated successfully",
                data: {...updatedUser[0], password_hash: undefined},
            }
        } catch (error) {
            console.log(error)
        }

    }, {
        isSignIn: true,
        body: t.Omit(t_db.update.user, ['password_hash']),
        response: {
            200: t.Object({
                message: t.String(),
                data: t.Omit(t_db.select.user, ["password_hash"])
            })
        }
    })
    .get("/:user_id/profile", async ({ params: { user_id }, set }) => {
        const user = await db.select().from(usersTable).where(eq(usersTable.id, user_id)).limit(1)

        if (user.length === 0) {
            set.status = 404
            return {
                ...getErrorMessage("USER_ERRORS", "USER_001"),
                message: "No user found"
            }
        }

        return user[0]
    }, {
        isSignIn: false,
        params: t.Object({
            user_id: t.Number()
        }),
        response: {
            200: t.Omit(t_db.select.user, ["password_hash"]),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })