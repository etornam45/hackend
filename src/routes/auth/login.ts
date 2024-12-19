import { usersTable } from "@/db/schema/users";
import { db } from "@/utils/db";
import { getErrorMessage } from "@/utils/error-codes";
import { JWT } from "@/utils/jwt";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

export const login = new Elysia()
    .use(JWT)
    // login User
    .post('/login', async ({ body, jwt, cookie: { auth_token }, response }) => {
        const user = await db.select().from(usersTable).where(eq(usersTable.email, body.email)).limit(1)

        if (user.length === 0) {
            return {
                ...getErrorMessage("USER_ERRORS", "USER_001"),
                message: "Sorry, your email was incorrect. Please double-check your email."
            }
        }

        if (!Bun.password.verifySync(body.password, user[0].password_hash)) {
            return {
                ...getErrorMessage("AUTH_ERRORS", "AUTH_001"),
                message: "Sorry, your password was incorrect. Please double-check your password."
            }
        }

        auth_token.set({
            value: await jwt.sign({
                username: user[0].username,
                email: user[0].email,
                id: user[0].id
            }),
            httpOnly: true,
            maxAge: 7 * 86400,
            path: '/',
        })
        await db.update(usersTable).set({ last_login: new Date() })
        return {
            message: "Login successful",
            data: { ...user[0], password_hash: undefined },
            auth_token: auth_token.value
        }
    }, {
        body: t.Object({
            email: t.String({ format: "email", error: "No email value found" }),
            password: t.String({ error: "No password value found" }),
        })
    })