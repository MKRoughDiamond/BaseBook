# 6월 19일
---
#### 1. 진행상황
* 마피아 버그 수정 및 배경음악 및 테마: 서순호
* 닉네임,프로필 백엔드 만듦: 김효민
* 이미지 포스트: 김효민
* 프로필 프론트: 장유원
* 백엔드 테스트: 김효민
* 프런트 테스트: 장유원
* 테마 변경: 최원석

#### 2. 백엔드 추가 API 스펙
| Url | Description | Example
| --- | --- | --- |
| POST `/users/password/` | 비밀번호를 변경한다.| password: 'asdf'
| POST `/users/profile` | 프로필을 변경한다.|  nicknanme: 'asdf', theme ''
| GET `/users/profile` | 프로필을 받아온다. |  nicknanme: 'asdf', theme ''

* `python3 runtest_back.py`

##### 추가 테스트 사항

* 

#### 3. 프런트엔드 테스트 코드

#### 4.Redux unit test
* `frontend/jest`에 테스트 파일 존재합니다.
* 파이프라인이 횟수가 다돼서 더이상 기능하지 않습니다.

#### 5. aws 서버
http://13.124.80.116:9000: 프런트
http://13.124.80.116:8000: 백엔드
