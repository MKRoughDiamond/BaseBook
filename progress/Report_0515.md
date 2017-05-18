# 5월 15일 SWPP PROJ.1 보고서
---
#### 1. 구현한 Behavior, system
* Feed, reply, like/dislike backend debugging: 최원석, 서순호
* Chat, scope backend implementation: 서순호
* Like/dislike frontend implementation: 김효민
* Chat frontend implementation: 장유원, 김효민
* Backend testcode implementation: 최원석
* Frontend testcode implementation: 장유원

#### 2. 추가된 Backend API Spec
* /chat/user/<상대방username>/에 POST를 하면 방이 존재할 경우 두 사람이 있는 방의 ID를 보내주고 없으면 만들어서 보내준다.
* /chat/<방id>/에 GET을 하면 만약 보지 못한 로그가 있을 경우 보내주고 그런 로그가 없으면 보내지 않는다. 즉, 한 유저에게 같은 로그를 두번 보내지 않는다.
* /chat/<방id>/에 contents를 POST를 하여 보내면 글이 써진다.
* /chat/<방id>/all 에 GET을 하면 그 방에 있는 모든 로그를 보내준다.
* /feed/에 scope를 global로 해서 보내면 다른 유저도 그 글을 볼 수 있다. 


#### 3. 추가된 Frontend API Spec
* Login하고 들어가면 Feed page가 나온다.
* Feed page에서는 content와 scope를 설정하여 글을 쓸 수 있다. 아직 scope는 아무 영향이 없지만 자기가 쓴 글이 Feed에서 볼 수 있다.
* 자기가 쓴 글에 good나 bad를 누르면 좋아요나 싫어요를 할 수 있다. 그리고 한번 더 누르면 자기가 한 good나 bad가 지워진다.
* Feed page에서 Chat버튼을 누르면 Chat page가 나온다.
* Chat page에서 상대방의 username을 적고 start버튼을 누르면 채팅이 시작된다.
* 이때 만약 과거의 로그가 존재한다면 모두 뜬다.
* 밑에 글을 적고 POST를 누르면 채팅을 할 수 있고, 1초에 한번씩 새로운 로그가 있는지 확인한다.

#### 4. Backend test code 실행방법
* `inittest.py`, `runtest_back.py`, `backend_test.sh`, `testlibrary.py`를 backend 폴더로 옮긴 후, backend 폴더에서 `./backend_test.sh`를 실행한다.

#### 5. Frontend test code 실행방법
* `./frontend_test.sh`, `python3 runtest_front.py`를 실행한다.