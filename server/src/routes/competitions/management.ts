import { competitionsTable } from "$/db/schema/competitions";
import { usersTable } from "$/db/schema/users";
import { t_db } from "$/db/utils/db";
import { AuthenticationPlugin } from "$/plugins/authentication";
import { db } from "$/utils/db";
import { getErrorMessage } from "$/utils/error-codes";
import { and, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";


/**### Competition Management
- [x] `POST /competitions`
- [x] `GET /competitions`
- [x] `GET /competitions/{competition_id}`
- [x] `PUT /competitions/{competition_id}`
- [x] `DELETE /competitions/{competition_id}` */
export const competition_management = new Elysia({
    tags: ['Competitions']
})
    .use(AuthenticationPlugin)
    .post("/", async ({ user, body, set }) => {
        const newCompetition = await db.insert(competitionsTable).values(body).returning()
        return {
            message: "Competition created successfully",
            data: newCompetition
        }
    }, {
        isSignIn: true,
        body: t_db.insert.competitions
    })
    .get("/", async ({ user }) => {
        try {
            const competition = await db.select().from(competitionsTable).where(eq(competitionsTable.host_id, Number(user?.id)))
            return {
                message: "Competition fetched successfully",
                data: competition
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }, {
        isSignIn: true
    })
    .get("/:competition_id", async ({ user, params: { competition_id } }) => {
        const competition = await db.select().from(competitionsTable).where(eq(competitionsTable.id, competition_id)).limit(1)
        return {
            message: "Competition fetched successfully",
            data: competition
        }
    }, {
        isSignIn: false,
        params: t.Object({
            competition_id: t.Number()
        })
    })
    .put("/:competition_id", async ({ user, body, params: { competition_id } }) => {
        console.log(body)
        try {
            const updatedCompetition = await db.update(competitionsTable).set(body).where(and(
                eq(competitionsTable.id, competition_id),
                eq(usersTable.id, +user?.id!)
            )).returning()
            return {
                message: "Competition updated successfully",
                data: updatedCompetition[0]
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }, {
        isSignIn: true,
        body: t.Omit(t_db.update.competitions, ["creation_date"]),
        params: t.Object({
            competition_id: t.Number()
        })
    })
    .delete("/:competition_id", async ({ user, params: { competition_id }, set }) => {
        try {
            const deletedCompetition = await db.delete(competitionsTable).where(and(
                eq(competitionsTable.id, competition_id),
                eq(competitionsTable.host_id, +user?.id!)
            )).returning()
            return {
                message: "Competition deleted successfully",
                data: deletedCompetition[0]
            }
        } catch (error) {
            console.log(error)
            set.status = 500
            return {
                ...getErrorMessage("COMPETITION_ERRORS", "COMP_001"),
                message: "Failed to delete competition",
                data: error
            }
        }
    }, {
        isSignIn: true,
        params: t.Object({
            competition_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.competitions
            }),
            500: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String(),
                data: t.Any()
            })
        }
    })