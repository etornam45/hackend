import Elysia from "elysia";
import { groups_management } from "./management";
import { groups_membership } from "./membership";

export const groups = new Elysia({
    prefix: "competitions",
    tags: ['Groups']
})
    .use(groups_management)
    .use(groups_membership)
