import { AuthenticationPlugin } from "$/plugins/authentication";
import { JWT } from "$/utils/jwt";
import Elysia from "elysia";

export const refresh_token = new Elysia()
    .use(AuthenticationPlugin)
    .use(JWT)
    .post("/refresh_token", async ({ jwt, user, cookie: { auth_token } }) => {

        auth_token.set({
            value: await jwt.sign({
                username: user?.username!,
                email: user?.email!,
                id: user?.id!
            }),
            httpOnly: true,
            maxAge: 7 * 86400,
            path: '/',
        })

        return {
            message: "Authentication token refreshed successufully",
            auth_token: auth_token.value
        }

    }, { isSignIn: true })