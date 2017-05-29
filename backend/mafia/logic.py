from django.utils import timezone
from django.contrib.auth.models import User
import random
import sched, time
from core.models import Chat

# make system user
def _create_system_user():
    pw = '$#&*fsjw3234'
    try:
        user = User.objects.create_user('system', 'system@mafia.com', pw)
    except Exception:
        return User.objects.get(username='system')
    user.save()
    return User.objects.get(username='system')

_system_user = None


MIN_START_PLAYER = 5


class Player:
    def __init__(self, user):
        self.user = user
        self.job = None
        self.vote_count = 0


class MafiaRoom:
    def __init__(self, room):
        self.room = room
        self.status = 'chat' # day / vote / night
        self._scheduler = sched.scheduler()
        
        self._players = {}  # key: user id
        self._mafias = []
        self._polices = []
        self._doctors = []
        self._civilians = []
        self._ghosts = []
        self._daycount = 0
    
    def register(self, user):
        for player in self._players.values():
            if player.user.id == user.id:
                return
        self._players[str(user.id)] = Player(user)
    
    def survivor_count(self):
        return len(self._players.values()) - len(self._ghosts)
    
    def player_count(self):
        return len(self._players.values())
    
    def start(self):
        if self.player_count() < MIN_START_PLAYER:
            return
        self._print('마피아 게임을 시작합니다.')
        self._assign_job()
        self.status = 'night'
        self._print('15초간 같은 팀끼리 대화할 수 있습니다.')
        self._scheduler.enter(15, 1, self._make_day)
        self._scheduler.run(False)
        
    def tick(self):
        self._scheduler.run(False)
    
    def _player(self, user):
        return self._players[str(user.id)]
    
    def _print(self, text, dm_players=None):
        chat = Chat.objects.create(room=self.room, user=_system_user, contents=text)
        if dm_players is not None:
            for player in self._players.values():
                if player not in dm_players:
                    chat.invisible.add(player.user)
        chat.save()
        
    def _assign_job(self):
        n_player = self.player_count()
        n_mafia = 2
        n_police = 1
        n_doctor = 1
        n_civilian = n_player - (n_mafia + n_police + n_doctor)
        self._print('총 인원: {}  마피아: {}  경찰: {}  의사: {}'
                    .format(n_player, n_mafia, n_police, n_doctor))
        
        jobs = (['mafia'] * n_mafia) + (['police'] * n_police) \
            + (['doctor'] * n_doctor) + (['civilian'] * n_civilian)
        random.seed(timezone.now())
        random.shuffle(jobs)
        
        i = 0
        for player in self._players.values():
            player.job = jobs[i]
            if player.job == 'mafia':
                self._mafias.append(player)
                self._print('당신의 직업은 마피아입니다!', [player])
            elif player.job == 'police':
                self._polices.append(player)
                self._print('당신의 직업은 경찰입니다.', [player])
            elif player.job == 'doctor':
                self._doctors.append(player)
                self._print('당신의 직업은 의사입니다.', [player])
            else:
                self._civilians.append(player)
                self._print('당신은 평범한 시민입니다.', [player])
            i = i + 1
    
    def _reset_votecount(self):
        for player in self._players.values():
            player.vote_count = 0
    
    def _check_vote_kill(self):
        vote_list = list(self._players.values())
        vote_list.sort(key=lambda x: x.vote_count, reverse=True)
        for player in vote_list:
            if player.vote_count == 0:
                break
            self._print('{}:\t {}표'.format(player.user.username, player.vote_count))
        
        if vote_list[0].vote_count < self.survivor_count() / 2:
            self._print('과반수를 넘지 못해 투표가 부결되었습니다.')
            return
        if vote_list[0].vote_count == vote_list[1].vote_count:
            self._print('투표가 동률이므로 부결되었습니다.')
            return
        death_player = vote_list[0]
        self._print('{}표를 얻은 {}(이)가 처형되었습니다.'
                    .format(death_player.vote_count, death_player.user.username))
        self._kill_player(death_player)
    
    def _kill_player(self, death_player):
        pass
        
    def _make_day(self):
        self.status = 'day'
        self._daycount = self._daycount + 1
        self._print('{}일차 낮이 되었습니다.'.format(self._daycount))
        self._print('3분간 자유롭게 토론해주시기 바랍니다.')
        self._scheduler.enter(150, 1, self._make_vote_30)
        self._scheduler.run(False)
    
    def _make_vote_30(self):
        self._print('투표 시작까지 30초 남았습니다.')
        self._scheduler.enter(25, 1, self._make_vote_5)
        self._scheduler.run(False)
        
    def _make_vote_5(self):
        self._print('투표 시작까지 5초 남았습니다.')
        self._scheduler.enter(5, 1, self._make_vote)
        self._scheduler.run(False)
    
    def _make_vote(self):
        self.status = 'vote'
        self._reset_votecount()
        self._print('투표시간이 되었습니다.')
        self._print('15초 동안 자유롭게 투표해주시기 바랍니다.')
        self._scheduler.enter(10, 1, self._vote_end_5)
        self._scheduler.run(False)
    
    def _vote_end_5(self):
        self._print('5초 남았습니다.')
        self._scheduler.enter(5, 1, self._vote_end)
        self._scheduler.run(False)

    def _vote_end(self):
        self._print('{}일차 투표가 끝났습니다.'.format(self._daycount))
        self._check_vote_kill()
        self._make_night()
    
    def _make_night(self):
        self.status = 'night'
        self._reset_votecount()
        self._print('밤이 되었습니다.')
        self._print('30초가 지나면 하루가 끝나게 됩니다.')
        self._print('암살할 상대를 지목하세요.', self._mafias)
        self._print('살펴볼 상대를 지목하세요.', self._polices)
        self._print('치유할 상대를 지목하세요.', self._doctors)
        self._scheduler.enter(25, 1, self._night_end_5)
        self._scheduler.run(False)
    
    def _night_end_5(self):
        self._print('5초 남았습니다.')
        self._scheduler.enter(5, 1, self._night_end)
        self._scheduler.run(False)
    
    def _night_end(self):
        # TODO
        self._make_day()
        
mafia_rooms = {}
