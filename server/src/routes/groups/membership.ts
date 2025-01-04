import { GroupMemberTable } from "$/db/schema/group-member";
import { t_db } from "$/db/utils/db";
import { AuthenticationPlugin } from "$/plugins/authentication";
import { db } from "$/utils/db";
import { and, eq } from "drizzle-orm";
import Elysia, { t } from "elysia";


/**
    * ### Group Membership
    - [x] POST /groups/{group_id}/members
    - [x] GET /groups/{group_id}/members
    - [x] PUT /groups/{group_id}/members/{userId}/role
    - [x] DELETE /groups/{group_id}/members/{userId}
 */

export const groups_membership = new Elysia({
    prefix: "groups",
    tags: ['Groups Membership']
})
    .use(AuthenticationPlugin)
    .post("/:group_id/members", async ({ params: { group_id }, user }) => {
        const newGroup = await db.insert(GroupMemberTable).values({
            group_id: group_id, user_id: Number(user?.id)
        }).returning()

        return {
            message: "Member added to group successfully",
            data: newGroup[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            group_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.group_members
            })
        }
    })
    .get("/:group_id/members", async ({ params: { group_id } }) => {
        const members = await db.select().from(GroupMemberTable).where(eq(GroupMemberTable.group_id, group_id))
        return {
            message: "Members in group",
            data: members[0]
        }
    }, {
        params: t.Object({
            group_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.group_members
            })
        }
    })
    .put("/:group_id/members/:user_id/role", async ({ params: { group_id, user_id }, body }) => {
        const member = await db.update(GroupMemberTable).set(body).where(and(
            eq(GroupMemberTable.group_id, group_id),
            eq(GroupMemberTable.user_id, user_id)
        )).returning()
        return {
            message: "Member role updated successfully",
            data: member[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            group_id: t.Number(),
            user_id: t.Number()
        }),
        body: t.Omit(t_db.update.group_members, ["group_id", "user_id", "joined_at"]),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.group_members
            })
        }
    })
    .delete("/:group_id/members/:user_id", async ({ params: { group_id, user_id } }) => {
        const member = await db.delete(GroupMemberTable).where(and(
            eq(GroupMemberTable.group_id, group_id),
            eq(GroupMemberTable.user_id, user_id)
        )).returning()
        return {
            message: "Member removed from group successfully",
            data: member[0]
        }
    }, {
        isSignIn: true,
        params: t.Object({
            group_id: t.Number(),
            user_id: t.Number()
        }),
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.group_members
            })
        }
    })
    
