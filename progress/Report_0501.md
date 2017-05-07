# 5월 1일 SWPP Proj.1 보고서
---

### NOTICE : 이번 첫 주에는 바쁜 일이 있던 사람이 많았던 관계로 구현한 behavior가 적음. 물리적으로 가능한 시간을 할당하여 구현을 완료할 수 있도록 진행할 것임.

#### 1. 구현한 behavior + 설정 목록
* Login page frontend design : 최원석
* Login page frontend implement : 김효민, 최원석
* Login page backend design : 서순호
* Login page backend implement: 서순호, 장유원
* AWS server environment setting : 김효민
* Database Schema setting : 전 팀원 참여
* ESLint setting : 서순호

#### 2. Backend API Spec
* Login page의 Backend는 ID와 PW의 정보를 hashing하여 그 값이 authenticated한 값이라면 로그인이 가능하다. 만일, 존재하지 않는 유저의 경우 alert를 출력한다.
* SignUp page의 Backend는 ID와 PW의 정보를 직접 POST하여 유저 데이터베이스에 추가될 수 있도록 한다. 이미 존재하는 유저라면 alert를 출력한다.
* 자세한 내용은 이슈 #2를 참조한다.

#### 3. Frontend API Spec
* Frontend Login page는 Login part와 SignUp part로 구성된다. 즉 하나의 url에서 해결하게 된다.
* Login part에는 ID와 PW를 입력받아 로그인을 하는 버튼이 있고, SignUp part로 이동하는 버튼이 있다.
* SignUp part에는 새로운 ID와 PW를 입력받아 새로운 회원을 생성하는 버튼이 있다. 이 버튼이 눌리면 다시 Login part로 이동하게 된다.(SignUp 성공시) 
* SignUp part에는 PW의 입력정보가 가려지게 되는데, 이 입력정보가 정상적으로 입력되었는지 확인하는 비밀번호 확인란이 있으며, 두 비밀번호가 서로 같은지 판별하는 부분이 존재한다.
* Login, SignUp이 실패할 경우, 실패한 원인을 포함한 NOTICE를 alert의 형태로 출력한다.
* 자세한 내용은 이슈 #3를 참조한다.

#### 4. AWS link
* frontend : http://13.124.80.116:3000/
* backend : http://13.124.80.116:8000/