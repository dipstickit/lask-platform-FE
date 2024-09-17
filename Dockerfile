FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --ignore-scripts

FROM node:18-alpine AS openapi-generate

RUN apk add openjdk11-jre-headless

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm i -g @openapitools/openapi-generator-cli

RUN npm run openapi-gen

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=openapi-generate /app ./

ENV NEXT_TELEMETRY_DISABLED 1

ARG API_PATH
ARG NEXT_PUBLIC_API_PATH
ENV API_PATH $API_PATH
ENV NEXT_PUBLIC_API_PATH $NEXT_PUBLIC_API_PATH

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm i sharp
ENV NEXT_SHARP_PATH /app/node_modules/sharp

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

RUN chown -R nextjs:nodejs /app

USER nextjs

CMD ["npm", "start", "--", "--keepAliveTimeout", "60000"]
