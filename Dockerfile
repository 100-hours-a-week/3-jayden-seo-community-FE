# 1. 베이스 이미지 선택 (LTS 버전 권장)
FROM node:20-alpine

# 2. 작업 디렉토리 생성
WORKDIR /app

# 3. package.json, package-lock.json만 먼저 복사
# (이 단계는 캐시 최적화를 위해 중요!)
COPY package*.json ./

# 4. 의존성 설치
RUN npm ci --only=production

# 5. 앱 코드 복사
COPY . .

# 6. 컨테이너가 사용할 포트 명시
EXPOSE 3000

# 7. 앱 실행 명령
CMD ["npm", "start"]