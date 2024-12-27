import Elysia from "elysia";

export const home = new Elysia({
    tags: ['Home']
})
.get("/", ({ redirect }) => redirect("/swagger"))