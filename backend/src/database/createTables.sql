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
