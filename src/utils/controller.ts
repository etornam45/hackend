import { competitionsTable } from "@/db/schema/competitions";
import { db } from "./db";
import { and, eq } from "drizzle-orm";

export async function UserOwnsCompetition({ user_id, competition_id }: { user_id: number, competition_id: number }) {
    const competition = await db.select().from(competitionsTable).where(and(
        eq(competitionsTable.id, competition_id),
        eq(competitionsTable.host_id, user_id)
    ))

    if (competition.length === 0) {
        return false
    }

    return true
}