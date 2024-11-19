FROM node:18.18.2-alpine

# Docker container 안의 기본 workdir를 /usr/src/app으로 설정.
WORKDIR /usr/src/app

COPY dist ./dist

COPY .env .

COPY node_modules ./node_modules

COPY package.json ./

COPY prisma ./prisma

# execute.sh에서 NODE_ENV에 따른 실행 명령어가 수행됨.
# 기본값은 npm run start-dev
CMD if [ "$NODE_ENV" = "production" ]; then npm run start-prod; elif [ "$NODE_ENV" = "development" ]; then npm run start-dev; else echo 'Unknown NODE_ENV value'; fi