import jwt from "@elysiajs/jwt";
import Elysia from "elysia";

export const JWT = new Elysia()
  .use(
    jwt({
      name: 'jwt',
      secret: 'Etrona von Luftschloss Narfidort',
      exp: '7d'
    })
  )