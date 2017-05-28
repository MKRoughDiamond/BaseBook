# 채팅방의 id는 1이다.
# user1~user5가 등록되어 있어야 한다.
# 1번 채팅방에 들어가서 보면 된다.
# python3 manage.py shell에서 아래 스크립트를 붙여넣으면 된다.

from mafia.interface import test_start_game, test_mafia_tick
from core.models import ChatRoom
room = ChatRoom.objects.get(id=1)
from django.contrib.auth.models import User
user = User.objects.get(username='user1')
test_start_game(room, user)
user = User.objects.get(username='user2')
test_start_game(room, user)
user = User.objects.get(username='user3')
test_start_game(room, user)
user = User.objects.get(username='user4')
test_start_game(room, user)
user = User.objects.get(username='user5')
test_start_game(room, user)
test_mafia_tick(room)

