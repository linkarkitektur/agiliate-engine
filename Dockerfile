FROM oven/bun:latest

WORKDIR /app
COPY package.json ./
COPY bun.lockb ./

RUN bun install --no-save

COPY . .

CMD ["bun", "run", "src/index.ts"]
