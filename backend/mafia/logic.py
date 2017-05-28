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

_system_user = _create_system_user()


MIN_START_PLAYER = 5


class Player:
    def __init__(self, user):
        self.user = user
        self.job = None
        self.ability_used = False
        self.vote_count = 0
        
        self.mafia_target = 0
        self.police_target = 0
        self.doctor_target = 0


class MafiaRoom:
    def __init__(self, room):
        self.room = room
        self.status = 'chat' # day / vote / night
        self._scheduler = sched.scheduler()
        self._jobs_textline = []
        
        self._players = {}  # key: user id
        self._survivors = []
        self._mafias = []
        self._polices = []
        self._doctors = []
        self._civilians = []
        self._ghosts = []
        self._daycount = 0
        self._corpse = None
    
    def register(self, user):
        for player in self._players.values():
            if player.user.id == user.id:
                return
        self._players[str(user.id)] = Player(user)
    
    def survivor_count(self):
        return len(self._survivors)
    
    def player_count(self):
        return len(self._players.values())
    
    def ability_used_count(self):
        count = 0
        for player in self._survivors:
            if player.ability_used:
                count += 1
        return count
    
    def start(self):
        if self.player_count() < MIN_START_PLAYER:
            return
        self._print('마피아 게임을 시작합니다.')
        self._assign_job()
        self.status = 'night'
        self._print('15초간 같은 팀끼리 대화할 수 있습니다.')
        self._scheduler.enter(15, 1, self._make_day)
        self._scheduler.run(False)
    
    def early_vote(self):
        self._print('과반수가 조기투표에 찬성했으므로 5초 후 투표가 시작됩니다.')
        self._scheduler.enter(5, 1, self._make_vote)
        self._scheduler.run(False)
    
    def use_ability(self, caster, target=None):
        if target is None:
            if self.status == 'day':
                self._survivor(caster).ability_used = True
            return
        p_caster = self._survivor(caster)
        p_target = self._survivor(target)
        if p_caster is None or p_target is None:
            return
        if self.status == 'vote':
            if not p_caster.ability_used:
                p_caster.ability_used = True
                p_target.vote_count += 1
        elif self.status == 'night':
            if not p_caster.ability_used:
                p_caster.ability_used = True
                if p_caster.job == 'mafia':
                    p_target.mafia_target += 1
                elif p_caster.job == 'police':
                    p_target.police_target += 1
                elif p_caster.job == 'doctor':
                    p_target.doctor_target += 1
    
    def make_ghost(self, user):
        player = self._player(user)
        if player is not None:
            self._make_ghost(player)
        
    def tick(self):
        self._scheduler.run(False)
    
    def _survivor(self, user):
        player = self._players.get(str(user.id))
        if player is None or player not in self._survivors:
            return None
        return player
    
    def _player(self, user):
        return self._players.get(str(user.id))
    
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
            self._survivors.append(player)
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
            i += 1
        
        # mafia / police / doctor / civilian
        self._jobs_textline = []
        self._jobs_textline.append(', '.join([u.user.username for u in self._mafias]))
        self._jobs_textline.append(', '.join([u.user.username for u in self._polices]))
        self._jobs_textline.append(', '.join([u.user.username for u in self._doctors]))
        self._jobs_textline.append(', '.join([u.user.username for u in self._civilians]))
        
    def _reset_votecount(self):
        for player in self._players.values():
            player.ability_used = False
            player.vote_count = 0
            player.mafia_target = 0
            player.police_target = 0
            player.doctor_target = 0
    
    def _kill_player(self, death_player):
        self._print('당신은 이제 죽었습니다.', [death_player])
        self._print('관전자가 되어 관전자끼리 대화할 수 있습니다.', [death_player])
        self._make_ghost(death_player)
    
    def _make_ghost(self, player):
        if player in self._survivors:
            self._survivors.remove(player)
        if player in self._mafias:
            self._mafias.remove(player)
        if player in self._polices:
            self._polices.remove(player)
        if player in self._doctors:
            self._doctors.remove(player)
        if player in self._civilians:
            self._civilians.remove(player)
        if player not in self._ghosts:
            self._ghosts.append(player)
    
    def _check_vote_kill(self):
        vote_list = list(self._survivors)
        vote_list.sort(key=lambda x: x.vote_count, reverse=True)
        total_vote_count = 0
        for player in vote_list:
            if player.vote_count == 0:
                break
            self._print('{}: {}표'.format(player.user.username, player.vote_count))
            total_vote_count += player.vote_count
        self._print('기권: {}표'.format(self.survivor_count() - total_vote_count))
        
        if vote_list[0].vote_count <= self.survivor_count() / 2:
            self._print('과반수를 넘지 못해 투표가 부결되었습니다.')
            return
        if vote_list[0].vote_count == vote_list[1].vote_count:
            self._print('투표가 동률이므로 부결되었습니다.')
            return
        death_player = vote_list[0]
        self._print('{}표를 얻은 {}(이)가 처형되었습니다.'
                    .format(death_player.vote_count, death_player.user.username))
        self._kill_player(death_player)
    
    def _ability_result(self):
        targets = list(self._survivors)
        targets.sort(key=lambda x: x.mafia_target, reverse=True)
        if targets[0].mafia_target == 0 or targets[0].mafia_target == targets[1].mafia_target:
            mafia_target = None
        else:
            mafia_target = targets[0]
        targets.sort(key=lambda x: x.police_target, reverse=True)
        if targets[0].police_target == 0 or targets[0].police_target == targets[1].police_target:
            police_target = None
        else:
            police_target = targets[0]
        targets.sort(key=lambda x: x.doctor_target, reverse=True)
        if targets[0].doctor_target == 0 or targets[0].doctor_target == targets[1].doctor_target:
            doctor_target = None
        else:
            doctor_target = targets[0]
        
        if mafia_target is None or mafia_target == doctor_target:
            self._corpse = None
        else:
            self._corpse = mafia_target
            self._kill_player(mafia_target)
        if police_target in self._mafias:
            self._print('{}(은)는 마피아가 맞습니다.'
                        .format(police_target.user.username), self._polices)
        else:
            self._print('{}(은)는 마피아가 아닙니다.'
                        .format(police_target.user.username), self._polices)
        
    def _win_condition(self):
        if len(self._mafias) >= self.survivor_count() / 2:
            self._print('마피아의 승리로 게임이 끝났습니다!')
            self._print_player_jobs()
            return True
        elif len(self._mafias) == 0:
            self._print('시민들의 승리로 게임이 끝났습니다!')
            self._print_player_jobs()
            return True
        return False
    
    def _print_player_jobs(self):
        self._print('마피아: {}'.format(self._jobs_textline[0]))
        self._print('경찰: {}  의사: {}'.format(self._jobs_textline[1], self._jobs_textline[2]))
        self._print('시민: {}'.format(self._jobs_textline[3]))
        
    def _make_day(self):
        self.status = 'day'
        self._reset_votecount()
        self._daycount += 1  
        self._print('{}일차 낮이 되었습니다.'.format(self._daycount))
        if self._daycount != 1:
            if self._corpse is None:
                self._print('밤중에 아무 일도 일어나지 않았습니다.')
            else:
                self._print('{}(이)가 사망한 채로 발견되었습니다.'.format(self._corpse.user.username))
        if self._win_condition():
            mafia_rooms.remove(self)    # delete this MafiaRoom
            map(self._scheduler.cancel, self._scheduler.queue)
        else:
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
        if self.status == 'vote': # if in early vote
            return
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
        self._scheduler.enter(3, 1, self._make_night)
        self._scheduler.run(False)
    
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
        self._ability_result()
        self._scheduler.enter(3, 1, self._make_day)
        self._scheduler.run(False)


mafia_rooms = {}
