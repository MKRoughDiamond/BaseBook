# 5월 8일 SWPP PROJ.1 보고서
---
#### 1. 구현한 Behavior, system
* Login frontend implementation : 서순호
* Feed, reply backend implementation : 김효민
* permissions, like/dislike backend implementation : 최원석
* Change Login system frontend: 서순호
* Change Login system backend: 서순호, 최원석
* Backend testcode implementation: 장유원
* Frontend testcode implementation

#### 2. Backend API Spec
* /signup/ 에 ID와 PW의 정보를 직접 POST하여 유저 데이터베이스에 추가될 수 있도록 한다. 이미 존재하는 유저라면 alert를 출력한다.
* /login/ ID와 PW의 정보를 hashing하여 그 값이 authenticated한 값이라면 로그인이 가능하다. 만일, 존재하지 않는 유저의 경우 alert를 출력한다.
* /feed/에 contents와 scope를 보내면 글이써진다. 지금은 자기가 쓴 글만 볼 수 있다. 추후에 볼 수 있는 scope를 만들어서 타인이 볼 수 있게 해줄 것이다.
* /feed/id(숫자)/reply에 contents를 보내주면 해당 Feed에 댓글을 쓸 수 있다.
* /feed/id(숫자)/(likes or dislikes)에 POST를 하면 좋아요나 싫어요가 되고 두 번 연속으로 할 수 없다. 그리고 DELETE를 하면 좋아요와 싫어요를 지울 수 있다.
* 자세한 내용은 이슈 #2를 참조한다.

#### 3. Frontend API Spec
* Frontend Login page는 Login part와 SignUp part로 구성된다. 즉 하나의 url에서 해결하게 된다.
* Login part에는 ID와 PW를 입력받아 로그인을 하는 버튼이 있고, SignUp part로 이동하는 버튼이 있다.
* SignUp part에는 새로운 ID와 PW를 입력받아 새로운 회원을 생성하는 버튼이 있다. 이 버튼이 눌리면 다시 Login part로 이동하게 된다.(SignUp 성공시) 
* SignUp part에는 PW의 입력정보가 가려지게 되는데, 이 입력정보가 정상적으로 입력되었는지 확인하는 비밀번호 확인란이 있으며, 두 비밀번호가 서로 같은지 판별하는 부분이 존재한다.
* Login, SignUp이 실패할 경우, 실패한 원인을 포함한 NOTICE를 alert의 형태로 출력한다.
* 자세한 내용은 이슈 #3를 참조한다.

#### 4. AWS Link
* frontend : http://13.124.80.116:3000/
* backend : http://13.124.80.116:8000/