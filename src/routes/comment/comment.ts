import { AuthenticationPlugin } from "@/plugins/authentication";
import Elysia from "elysia";

export const comment_management = new Elysia({
    tags: ['Comment Management']
})
    .use(AuthenticationPlugin)