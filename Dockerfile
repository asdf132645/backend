# 1단계: Node.js 환경 설정
FROM node:18-alpine
WORKDIR /app

# 전체 권한 부여
RUN chmod -R 777 /app

# 의존성 설치
COPY package*.json ./
RUN npm install --production

# 빌드 단계 추가
COPY . ./
RUN npm run build

# NestJS 포트
EXPOSE 3002

# 애플리케이션 실행
CMD ["node", "dist/src/main"]
