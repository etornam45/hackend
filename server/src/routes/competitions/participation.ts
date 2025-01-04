/**
 ### Competition Participation
    - [ ] `POST /competitions/{competition_id}/participants`
    - [ ] `GET /competitions/{competition_id}/participants`
    - [ ] `POST /competitions/{competition_id}/submit`
    - [ ] `GET /competitions/{competition_id}/submissions`
 */

import { CompetitionParticipants } from "$/db/schema/competition_participants";
import { t_db } from "$/db/utils/db";
import { AuthenticationPlugin } from "$/plugins/authentication";
import { db } from "$/utils/db";
import { getErrorMessage } from "$/utils/error-codes";
import { eq } from "drizzle-orm";
import Elysia, { t } from "elysia";

const params = t.Object({
    competition_id: t.Number()
})

export const participation = new Elysia({
    tags: ['Participation']
})
    .use(AuthenticationPlugin)
    .post("/:competition_id/participants", async ({ params: { competition_id }, set , user }) => {
        const newParticipant = await db.insert(CompetitionParticipants).values({competition_id, user_id: Number(user?.id)}).returning()

        if (newParticipant.length === 0) {
            set.status = 500
            return {
                ...getErrorMessage("COMPETITION_ERRORS", "COMP_001"),
                message: "Failed to add participant to competition",
                data: newParticipant
            }
        }

        return {
            message: "Participant added to competition successfully",
            data: newParticipant[0]
        }
    }, {
        isSignIn: true,
        params,
        response: {
            200: t.Object({
                message: t.String(),
                data: t_db.select.competition_participants
            }),
            500: t.Object({
                code: t.String(),
                error: t.String(),
                message: t.String()
            })
        }
    })
    .get("/:competition_id/participants", async ({ params: { competition_id } }) => {
        const participants = await db.select().from(CompetitionParticipants).where(eq(CompetitionParticipants.competition_id, competition_id))
        return {
            message: "Participants fetched successfully",
            data: participants
        }
    }, { isSignIn: true, params })
    .post("/:competition_id/submit", async ({ params: { competition_id }, body, set }) => {

    }, { isSignIn: true, params })
    .get("/:competition_id/submissions", async ({ params: { competition_id } }) => {

    }, { isSignIn: true, params })