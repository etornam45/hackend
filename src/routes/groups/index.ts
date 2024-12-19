import Elysia from "elysia";
import { groups_management } from "./management";

export const groups = new Elysia({
    prefix: "competitions",
    tags: ['Groups']
})
    .use(groups_management)
