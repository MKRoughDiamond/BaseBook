from django.conf.urls import url
from rest_api import views
from django.contrib.auth.models import User
from mafia.interface import start_game, make_vote, end_game

urlpatterns = [
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^login/$', views.user_login.as_view()),
    url(r'^signup/$', views.user_signup.as_view()),
    url(r'^feed/$', views.FeedList.as_view()),
    url(r'^feed/user/(?P<nickname>\w+)/$', views.FeedList.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/$', views.FeedDetail.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/reply/$', views.ReplyList.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/likes/$', views.LikeList.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/dislikes/$', views.DislikeList.as_view()),
    url(r'^hashtag/$', views.HashTagList.as_view()),
    url(r'^hashtag/(?P<hashtag>\w+)/$', views.HashTagFeedList.as_view()),
    url(r'^reply/(?P<pk>[0-9]+)/$', views.ReplyDetail.as_view()),
    url(r'^chat/user/(?P<nickname>\w+)/$', views.ChatRoomID.as_view()),
    url(r'^chat/(?P<pk>[0-9]+)/$', views.ChatDetail.as_view()),
    url(r'^chat/(?P<pk>[0-9]+)/all/$', views.ChatAll.as_view()),
    url(r'^multichat/$', views.MultiChatRoomID.as_view()),
    url(r'^multichat/enter/(?P<pk>[0-9]+)/$', views.MultiChatRoomID.as_view()),
    url(r'^multichat/(?P<pk>[0-9]+)/$', views.MultiChatDetail.as_view()),
    url(r'^multichat/(?P<pk>[0-9]+)/all/$', views.MultiChatAll.as_view()),
    url(r'^friend/(?P<nickname>\w+)/$', views.FriendList.as_view()),
    
    url(r'^mafia/(?P<pk>[0-9]+)/start/$', views.MafiaGame.as_view(), {'func': start_game}),
    url(r'^mafia/(?P<pk>[0-9]+)/earlyvote/$', views.MafiaGame.as_view(), {'func': make_vote}),
    url(r'^mafia/(?P<pk>[0-9]+)/end/$', views.MafiaGame.as_view(), {'func': end_game}),
    url(r'^mafia/(?P<pk>[0-9]+)/target/(?P<nickname>\w+)/$', views.MafiaGameAbility.as_view()),
    url(r'^users/password/$', views.Password.as_view()),
    url(r'^users/profile/$', views.Profile.as_view())
]
