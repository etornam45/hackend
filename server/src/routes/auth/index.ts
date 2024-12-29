import Elysia from "elysia";
import { register } from "./register";
import { login } from "./login";
import { logout } from "./logout";
import { refresh_token } from "./refresh-token";

export const auth = new Elysia({
    prefix: 'auth',
    name: 'Authentication',
    tags: ['Authentication']
})
    .use(register)
    .use(login)
    .use(logout)
    .use(refresh_token)