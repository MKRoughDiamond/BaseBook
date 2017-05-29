from mafia.logic import mafia_rooms, MafiaRoom
import time

def test_start_game(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None:
        mafia = mafia_rooms[str(room.id)] = MafiaRoom(room)
    if mafia.status != 'chat':
        return
    
    mafia.register(user)
    if mafia.player_count() == 5:
        mafia.start()
        
        
def start_game(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None:
        mafia = mafia_rooms[str(room.id)] = MafiaRoom(room)
    if mafia.status != 'chat':
        return
    
    mafia.register(user)
    if mafia.player_count() == room.users.count():
        mafia.start()


# If game already started, make user ghost
def user_entered(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return
    mafia.register(user)
    mafia.make_ghost(user)


def test_mafia_tick(room):
    while True:
        mafia_tick(room)
        time.sleep(1)


# Periodically update room status
def mafia_tick(room):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None:
        return
    mafia.tick()
