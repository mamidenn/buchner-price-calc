FROM node:20 AS BUILD
WORKDIR /src
RUN corepack enable
COPY . .
RUN corepack install
RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM node:20 AS STAGE
WORKDIR /src
RUN corepack enable
COPY --from=BUILD /src/package.json /src/pnpm-lock.yaml ./
COPY --from=BUILD /src/build ./build
RUN corepack install
RUN pnpm install --frozen-lockfile --prod

FROM node:20 AS PROD
WORKDIR /app
COPY --from=STAGE /src .
ENV ORIGIN http://localhost:3000
EXPOSE 3000
VOLUME /app/build/client/data
ENTRYPOINT node build
