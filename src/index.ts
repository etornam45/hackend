import { Elysia } from "elysia";
import 'dotenv/config';
import { swagger } from '@elysiajs/swagger'
import { auth } from "@/routes/auth";
import { AuthenticationPlugin } from "./plugins/authentication";
import { cors } from '@elysiajs/cors'
import { users } from "./routes/users";
import { competitions } from "./routes/competitions";
import { spaces } from "./routes/space";
import { groups } from "./routes/groups";



const app = new Elysia()
  .use(cors())
  .use(swagger())
  .use(AuthenticationPlugin)
  .use(auth)
  .use(users)
  .use(competitions)
  .use(spaces)
  .use(groups)
  .get("/", ({ redirect }) => redirect("/swagger"))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.url}`
);
