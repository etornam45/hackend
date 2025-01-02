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
import { home } from "./routes";
import { posts } from "./routes/posts";
import { comment_management } from "./routes/comment/comment";



export const app = new Elysia()
  .use(cors({
    origin: ["https://hackend.vercel.app", "http://localhost:5173"]
  }))
  .use(swagger())
  .use(AuthenticationPlugin)
  .use(auth)
  .use(users)
  .use(competitions)
  .use(spaces)
  .use(groups)
  .use(posts)
  .use(comment_management)
  .use(home)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.url}`
);


export type App = typeof app;