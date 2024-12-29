import { t_db } from "@/db/utils/db";
import { AuthenticationPlugin } from "@/plugins/authentication";
import Elysia, { t } from "elysia";
import { and, eq } from "drizzle-orm";
import { db } from "@/utils/db";
import { Spaces } from "@/db/schema/spaces";
import { UserOwnsCompetition } from "@/utils/controller";
import { getErrorMessage } from "@/utils/error-codes";

const params = t.Object({ competition_id: t.Number() })

export const spaces_management = new Elysia()
    .use(AuthenticationPlugin)
    .post("/:competition_id/spaces", async ({ body, params: { competition_id }, user }) => {

        if (!UserOwnsCompetition({ user_id: +user?.id!, competition_id: competition_id })) return

        const newSpace = await db.insert(Spaces).values({ ...body, competition_id, created_by: Number(user?.id) }).returning()

        if (newSpace.length === 0) {
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_001"),
                message: "Failed to add space to competition",
                data: newSpace
            }
        }

        return {
            message: "Space added to competition successfully",
            data: newSpace[0]
        }
    }, {
        isSignIn: true,
        params,
        body: t.Omit(t_db.insert.spaces, ["competition_id", "created_at", "created_by"])
    })
    .get("/:competition_id/spaces", async ({ user, params: { competition_id } }) => {
        if (!UserOwnsCompetition({ user_id: +user?.id!, competition_id })) return
        const spaces = await db.select().from(Spaces).where(eq(Spaces.competition_id, competition_id))


        if (spaces.length === 0) {
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_002"),
                message: "No spaces found"
            }
        }

        return {
            message: "Spaces fetched successfully",
            data: spaces
        }
    }, {
        isSignIn: true,
        params,
    })
    .put("/:competition_id/spaces/:space_id", async ({ user, params: { competition_id, space_id }, body }) => {
        if (!UserOwnsCompetition({ user_id: +user?.id!, competition_id })) return

        const updatedSpace = await db.update(Spaces).set(body).where(and(
            eq(Spaces.id, space_id),
            eq(Spaces.competition_id, competition_id)
        )).returning()

        if (updatedSpace.length === 0) {
            return {
                ...getErrorMessage("FORUM_ERRORS", "FORUM_003"),
                message: "Failed to update space",
                data: updatedSpace
            }
        }

        return {
            message: "Space updated successfully",
            data: updatedSpace[0]
        }
    }, {
        isSignIn: true,
        body: t.Omit(t_db.update.spaces, ["competition_id", "created_at", "created_by"]),
        params: t.Object({
            competition_id: t.Number(),
            space_id: t.Number()
        })
    })