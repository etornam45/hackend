import { AuthenticationPlugin } from "$/plugins/authentication";
import Elysia from "elysia";

export const logout = new Elysia()
    .use(AuthenticationPlugin)
    // logout User
    .post('/logout', ({ cookie: { auth_token } }) => {
        auth_token.remove()

        return {
            message: "Successfully logged out"
        }
    }, {
        isSignIn: true
    })