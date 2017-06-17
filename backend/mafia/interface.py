from mafia.logic import mafia_rooms, MafiaRoom
import time


# If game already started, make user ghost
def user_entered(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return
    mafia.register(user)
    mafia.make_ghost(user)


def user_chat_team(room, user, chat):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return chat
    return mafia.set_chat_team(user, chat)


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


def end_game(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return
    
    mafia.quit_vote(user)
    if mafia.quit_voted_count() > mafia.survivor_count() / 2:
        mafia.end()
        

def make_vote(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status != 'day':
        return
    
    mafia.use_ability(user, None)
    if mafia.ability_used_count() > mafia.survivor_count() / 2:
        mafia.early_vote()
        

def use_ability(room, user, target):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat' or mafia.status == 'day':
        return
    mafia.use_ability(user, target)


def get_bgm(room, user):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return 'none'
    return mafia.get_bgm(user)


def get_theme(room):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return 'none'
    return mafia.get_theme()


def test_mafia_tick(room):
    while True:
        mafia_tick(room)
        time.sleep(1)


# Periodically update room status
def mafia_tick(room):
    mafia = mafia_rooms.get(str(room.id))
    if mafia is None or mafia.status == 'chat':
        return
    mafia.tick()
