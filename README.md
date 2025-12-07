# Daily Share
> Daily Share 프로젝트의 프론트엔드 리포지토리입니다.

## **📌** 프로젝트 개요

### 서비스 소개

여러 사용자가 자신의 일상을 서로 게시글로 공유하며 서로 소통할 수 있는 커뮤니티 서비스의 서버 리포지토리입니다.

### 주요 기능

- 회원가입, 로그인 (JWT)
- 회원정보 조회, 수정
- 게시글, 댓글
- 게시글 좋아요
- 게시글, 회원 이미지 업로드

---

## **🛠** 기술 스택

- **Language**: JavaScript (ES6+)
- **Frontend**: HTML, CSS, Vanilla JS
- **Runtime / Dev Server**: Node.js, Express.js
- **Infra / DevOps**
    - AWS EC2, S3, Lambda, API Gateway
    - Docker, GitHub Actions
    - Nginx (배포 환경)
- **Etc**
    - Fetch API 기반 API 호출 모듈화
    - JWT 기반 인증 관리

## 🧱 서버 아키텍쳐




## 🗂️ 패키지 구조

```bash
community/
	├── .github/
	│   └── workflows/         
	├── .idea/               
	├── public/   
	│		  ├── cs
	│			│		└── ....	
	│		  ├── js
	│		  │   ├── api
	│			│		│    └── ....	
	│			│		└── utils
	│			│		│    └── fetchHelper.js
	│		  ├── config
	│			│		└── ....	
	│		  ├── index.html
	│			└── ....		             
	├── tests/     
	│			└── app.test.js              
	├── .dockerignore  
	├── .gitignore  
	├── Dockerfile  
	├── app.js                 
	├── server.js 
	├── package-lock.json  
	└── package.json      
	      

```

## **🚀 실행 방법**

```bash
cd community
npm start
```

## **🎬 시연 영상**


https://github.com/user-attachments/assets/097d0c01-6da6-4ab8-ab74-eb397021b450



