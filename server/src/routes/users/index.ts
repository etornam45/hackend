import Elysia from "elysia";
import { profile } from "./profile";

export const users = new Elysia({
    prefix: "users",
    tags: ['Users'] 
}).use(profile)
