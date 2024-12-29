import { usersTable } from "@/db/schema/users";
import { db } from "@/utils/db";
import { getErrorMessage } from "@/utils/error-codes";
import { JWT } from "@/utils/jwt";
import { eq } from "drizzle-orm";
import Elysia from "elysia";

export const AuthenticationPlugin = new Elysia()
    .use(JWT)
    .macro(({ onBeforeHandle }) => ({
        isSignIn(enabled: boolean) {
            if (!enabled) return

            onBeforeHandle(
                async ({  cookie: { auth_token }, jwt }) => {
                    if (!auth_token.value) {
                        return {
                            ...getErrorMessage("AUTH_ERRORS", "AUTH_007"),
                            message: "No authentication token found"
                        }
                    }

                    const payload = await jwt.verify(auth_token.value)

                    if (payload === false) {
                        // Handle the error case
                        return {
                            ...getErrorMessage("AUTH_ERRORS", "AUTH_007"),
                            message: "Invalid authentication token"
                        }
                    }

                    const user = await db.select().from(usersTable).where(eq(usersTable.username, payload.username as string)).limit(1)

                    if (user.length === 0) {
                        return {
                            ...getErrorMessage("USER_ERRORS", "USER_001"),
                            message: "No user found, please authenticate first"
                        }
                    }
                }
            )
        }
    }))
    .resolve(async ({ cookie: { auth_token }, jwt }) => {
        const payload = await jwt.verify(auth_token.value)

        if (payload === false) {
            // Handle the error case
            return {
                ...getErrorMessage("AUTH_ERRORS", "AUTH_007"),
                message: "Invalid token"
            }
        }

        const user = await db.select().from(usersTable).where(eq(usersTable.username, payload.username as string)).limit(1)

        if (user.length === 0) {
            return {
                ...getErrorMessage("USER_ERRORS", "USER_001"),
                message: "No user found, please authenticate first"
            }
        }

        return {
            user: {...user[0], password_hash: undefined }
        }
    })
    .as("plugin")