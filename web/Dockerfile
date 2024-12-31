FROM oven/bun:1
WORKDIR /app
COPY . .
RUN bun install
 
ARG PORT
EXPOSE ${PORT:-5173}

RUN bun run build

CMD ["bun", "run", "start"]