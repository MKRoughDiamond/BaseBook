# 6월 12일
---
#### 1. 진행상황
* 마피아 프런트엔드 구현(WIP): 서순호
* 멀티채팅 프런트: 장유원
* 마크다운 백엔드 테스트, 멀티채팅 프런트 디버깅 및 기능 추가: 김효민
* 프런트 디자인 및 멀티챗 기능 추가: 최원석

* 이번주는 시험이 있으므로 공부를 하느라 다음주까지 나머지를 할 계획 입니다.

#### 2. 백엔드 추가 API 테스트코드
| Url | Description | Example
| --- | --- | --- |
| POST `/feed/` | Feed를 적는다. Feedtype로 Markdown과 Text가 있다 | feedtype: 'Markdown' |
* `python3 runtest_back.py`
#### 3. 프런트
* `python3 runtest_front.py`

#### 4. Redux unit test
* `frontend/jest`에 test파일 존재합니다.
* selectors.js 는 따로 없고 리듀서들 파일에 나눠져 있고 reducers.js는 reducers 폴더에 나누어져서 있습니다.

#### 5. aws 링크
* 13.124.80.116:9000 프런트엔드
* 13.124.80.116:8000 백엔드