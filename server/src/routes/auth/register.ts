import { usersTable } from "@/db/schema/users";
import { db } from "@/utils/db";
import { getErrorMessage } from "@/utils/error-codes";
import Elysia, { t } from "elysia";


export const register = new Elysia()
    // Register User
    .post('/register', async ({ body }) => {

        if (!body.email || !body.username || !body.password) {
            return {
                ...getErrorMessage("AUTH_ERRORS", "AUTH_001"),
                message: ""
            }
        }

        try {
            const data = await db.insert(usersTable).values({
                email: body.email,
                username: body.username,
                password_hash: await Bun.password.hash(body.password),
                account_status: body.account_status,
                first_name: body.first_name,
                last_name: body.last_name,
                location: body.location,
            } as typeof usersTable.$inferInsert).returning()

            return data
        } catch (error) {

        }
    }, {
        body: t.Object({
            email: t.String({ format: "email", error: "No email value found" }),
            username: t.String({ error: "No username value found"}),
            password: t.String({error: "No password value found"}),
            account_status: t.Optional(t.Enum({
                'active': "active",
                "suspended": "suspended",
                "banned": "banned"
            })),
            first_name: t.Optional(t.String()),
            last_name: t.Optional(t.String()),
            location: t.Optional(t.String())
        })
    })