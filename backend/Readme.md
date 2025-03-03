# 1. 백엔드 프로젝트 

### 프로젝트 기술 스택
- Node.js
- Express.js
- MySQL  (데이터베이스)
- MySQL2 (데이터베이스 클라이언트)
- Docker (개발 및 배포 환경)
------
# 2. 실행 가이드

### a. 레포지토리 복제
```sh
git clone <repository-url>
cd <repository-directory>
```

### b. 의존성 설치
```sh
npm install
```

### c. 환경 변수 설정
프로젝트 루트 디렉토리에 `.env` 파일을 생성하고 필요한 환경 변수를 설정합니다. 예:
```env
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=chalix_db
```

### d. 데이터베이스 설정
MySQL 서버를 실행하고, 아래 초기 세팅용 쿼리문을 사용하여 데이터베이스와 테이블을 생성합니다.

```sql
-- 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS chalix_db;
USE chalix_db;

-- 게시글 테이블 생성
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  conference_name VARCHAR(255) NOT NULL,
  paper_title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  note VARCHAR(255) NOT NULL DEFAULT '국내',
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 테스트 데이터 삽입
INSERT INTO posts (conference_name, paper_title, date, note, view_count) VALUES
('AI 기반 자연어 처리 기술 발표', '이 논문에서는 최신 자연어 처리 기술을 소개합니다.', '2023-10-01', '국내', 42),
('딥러닝 모델의 효율성 개선 연구', '딥러닝 모델의 연산 효율성을 개선하는 방법에 대한 연구입니다.', '2023-10-02', '국내', 27),
('컴퓨터 비전 기술의 의료 분야 적용', '컴퓨터 비전 기술이 의료 분야에서 어떻게 활용될 수 있는지 연구했습니다.', '2023-10-03', '해외', 65),
('자연어 처리의 미래', '자연어 처리 기술의 미래에 대한 전망을 다룹니다.', '2023-10-04', '국내', 30),
('머신러닝을 활용한 데이터 분석', '머신러닝 기법을 활용한 데이터 분석 사례를 소개합니다.', '2023-10-05', '해외', 50),
('인공지능의 윤리적 문제', '인공지능 기술이 야기할 수 있는 윤리적 문제를 논의합니다.', '2023-10-06', '국내', 15),
('로봇 공학의 발전', '로봇 공학 기술의 최신 발전 상황을 다룹니다.', '2023-10-07', '해외', 22),
('빅데이터 처리 기술', '빅데이터를 효과적으로 처리하는 기술에 대해 설명합니다.', '2023-10-08', '국내', 40),
('클라우드 컴퓨팅의 장점', '클라우드 컴퓨팅의 장점과 활용 사례를 소개합니다.', '2023-10-09', '해외', 35),
('사물인터넷(IoT)의 현재와 미래', '사물인터넷 기술의 현재와 미래를 전망합니다.', '2023-10-10', '국내', 28);
```

### e. 서버 실행
```sh
npm start
```

### f. 실행 완료
서버가 실행되면, `http://localhost:8000`으로 API를 사용할 수 있습니다.

------

# API 가이드

### GET /board/presentation
모든 게시글을 조회합니다.
- 응답: 200 OK
```json
[
  {
    "id": 1,
    "conference_name": "AI 기반 자연어 처리 기술 발표",
    "paper_title": "이 논문에서는 최신 자연어 처리 기술을 소개합니다.",
    "date": "2023-10-01",
    "note": "국내",
    "view_count": 42,
    "created_at": "2023-10-01T00:00:00.000Z",
    "updated_at": "2023-10-01T00:00:00.000Z"
  },
  // ...more posts
]
```

### GET /board/presentation/:id
특정 게시글을 조회합니다.
- 매개변수: `id` (게시글 ID)
- 응답: 200 OK
```json
{
  "id": 1,
  "conference_name": "AI 기반 자연어 처리 기술 발표",
  "paper_title": "이 논문에서는 최신 자연어 처리 기술을 소개합니다.",
  "date": "2023-10-01",
  "note": "국내",
  "view_count": 43,
  "created_at": "2023-10-01T00:00:00.000Z",
  "updated_at": "2023-10-01T00:00:00.000Z"
}
```

### POST /board/presentation
새로운 게시글을 생성합니다.
- 요청 본문:
```json
{
  "conference_name": "새로운 학술대회명",
  "paper_title": "새로운 논문명",
  "date": "2023-10-11",
  "note": "국내"
}
```
- 응답: 201 Created
```json
{
  "message": "게시글이 성공적으로 생성되었습니다.",
  "id": 4
}
```

### PUT /board/presentation/:id
특정 게시글을 수정합니다.
- 매개변수: `id` (게시글 ID)
- 요청 본문:
```json
{
  "conference_name": "수정된 학술대회명",
  "paper_title": "수정된 논문명",
  "date": "2023-10-12",
  "note": "해외"
}
```
- 응답: 200 OK
```json
{
  "message": "게시글이 성공적으로 수정되었습니다."
}
```

### DELETE /board/presentation/:id
특정 게시글을 삭제합니다.
- 매개변수: `id` (게시글 ID)
- 응답: 200 OK
```json
{
  "message": "게시글이 성공적으로 삭제되었습니다."
}
```