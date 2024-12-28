FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install
 
ARG PORT
EXPOSE ${PORT:-3000}

RUN npx drizzle-kit push

CMD ["bun", "run", "start"]