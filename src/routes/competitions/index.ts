import Elysia from "elysia";
import { competition_management } from "./management";
import { participation } from "./participation";

export const competitions = new Elysia({
    prefix: "competitions",
    tags: ['Competitions']
})
.use(competition_management)
.use(participation)