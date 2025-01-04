import { GroupTable } from "$/db/schema/group";
import { t_db } from "$/db/utils/db";
import { AuthenticationPlugin } from "$/plugins/authentication";
import { UserOwnsCompetition } from "$/utils/controller";
import { db } from "$/utils/db";
import { getErrorMessage } from "$/utils/error-codes";
import { and, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

export const groups_management = new Elysia({
    tags: ['Groups Management']
})
    .use(AuthenticationPlugin)
    .post("/:competition_id/groups", async ({ body, params: { competition_id }, user }) => {
        if (!UserOwnsCompetition({ user_id: +user?.id!, competition_id: competition_id })) return

        const newGroup = await db.insert(GroupTable).values({ ...body, competition_id, created_by: Number(user?.id) }).returning()

        if (newGroup.length === 0) {
            return {
                ...getErrorMessage("GROUP_ERRORS", "GROUP_001"),
                message: "Failed to add group to competition",
                data: newGroup
            }
        }

        return {
            message: "Group added to competition successfully",
            data: newGroup[0]
        }

    }, {
        isSignIn: true,
        body: t.Omit(t_db.insert.groups, ["competition_id", "created_at", "created_by"]),
        params: t.Object({
            competition_id: t.Number()
        })
    })
    .get("/:competition_id/groups", async ({set,  params: { competition_id }, user }) => {
        if (!UserOwnsCompetition({ user_id: +user?.id!, competition_id: competition_id })) {
            set.status = 400
            return {
                ...getErrorMessage("GROUP_ERRORS", "GROUP_004"),
                message: "You are not authorized to view this group",
                data: null
            }
        }

        const groups = await db.select().from(GroupTable).where(eq(GroupTable.competition_id, competition_id))

        if (groups.length === 0) {
            return {
                ...getErrorMessage("GROUP_ERRORS", "GROUP_002"),
                message: "No groups found",
                data: groups
            }
        }

        return {
            message: "Groups fetched successfully",
            data: groups
        }
    }, {
        isSignIn: true,
        params: t.Object({
            competition_id: t.Number()
        }),
        response: {
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            }),
            200: t.Object({
                message: t.String(),
                data: t.Array(t_db.select.groups)
            })
        }
    })
    .put("/:competition_id/groups/:group_id", async ({ set, user, params: { competition_id, group_id }, body }) => {
        if (!UserOwnsCompetition({ user_id: +user?.id!, competition_id })) {
            return {
                ...getErrorMessage("GROUP_ERRORS", "GROUP_004"),
                message: "You are not authorized to update this group",
                data: null
            }
        }

        const updatedGroup = await db.update(GroupTable).set(body).where(and(
            eq(GroupTable.id, group_id),
            eq(GroupTable.competition_id, competition_id)
        )).returning()

        if (updatedGroup.length === 0) {
            set.status = 400
            return {
                ...getErrorMessage("GROUP_ERRORS", "GROUP_003"),
                message: "Failed to update group",
                data: updatedGroup
            }
        }

        return {
            message: "Group updated successfully",
            data: updatedGroup[0]
        }
    }, {
        isSignIn: true,
        body: t.Omit(t_db.update.groups, ["competition_id", "created_at", "created_by"]),
        params: t.Object({
            competition_id: t.Number(),
            group_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.groups
            }),
            400: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })