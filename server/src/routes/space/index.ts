import Elysia from "elysia";
import { spaces_management } from "./management";

export const  spaces = new Elysia({
    prefix: "competitions",
    tags: ["Spaces"]
})
 .use(spaces_management)