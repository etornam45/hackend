FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install
 
ARG PORT
EXPOSE ${PORT:-3000}

ENV DATABASE_URL="postgresql://neondb_owner:LQc8tFheT7uK@ep-calm-queen-a2jzoask.eu-central-1.aws.neon.tech/neondb?sslmode=require"

RUN bunx drizzle-kit push

CMD ["bun", "run", "start"]