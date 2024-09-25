FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN apt-get update && apt-get install -y bash && apt-get clean

RUN corepack enable

WORKDIR /home/node/app

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM base
WORKDIR /home/node/app
COPY --from=prod-deps /home/node/app/node_modules ./node_modules
COPY --from=build /home/node/app/dist ./dist

CMD [ ".docker/start.sh" ]
