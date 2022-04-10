# Stage A - Install Dependencies
FROM node:16.14-slim AS install-stage
WORKDIR /nextjs
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Stage B - Build NextJS App
FROM node:16.14-slim AS build-stage
WORKDIR /nextjs
COPY . .
COPY --from=install-stage /nextjs/node_modules ./node_modules
RUN yarn build

# Stage C - Run NextJS App in Production Mode
FROM alpine:3.15 as production-ready-stage
RUN apk add --update nodejs npm

# Create User Group and User for better securtiy
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001 -G nodejs
USER nextjs

RUN mkdir /home/nextjs/app
WORKDIR /home/nextjs/app

COPY --chown=nextjs:nodejs --from=build-stage /nextjs/next.config.js ./
COPY --chown=nextjs:nodejs --from=build-stage /nextjs/public ./public
COPY --chown=nextjs:nodejs --from=build-stage /nextjs/.next ./.next
COPY --chown=nextjs:nodejs --from=build-stage /nextjs/node_modules ./node_modules
COPY --chown=nextjs:nodejs --from=build-stage /nextjs/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "start"]
