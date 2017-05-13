from django.conf.urls import url
from rest_api import views
from django.contrib.auth.models import User

urlpatterns = [
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^login/$', views.user_login.as_view()),
    url(r'^signup/$', views.user_signup.as_view()),
    url(r'^feed/$', views.FeedList.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/$', views.FeedDetail.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/reply/$', views.ReplyList.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/likes/$', views.LikeList.as_view()),
    url(r'^feed/(?P<pk>[0-9]+)/dislikes/$', views.DislikeList.as_view()),
    url(r'^reply/(?P<pk>[0-9]+)/$', views.ReplyDetail.as_view()),
    url(r'^chat/user/(?P<username>\w+)/$', views.ChatRoomID.as_view()),
    url(r'^chat/(?P<pk>[0-9]+)/$', views.ChatDetail.as_view()),
]
