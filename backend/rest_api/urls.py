from django.conf.urls import url
from rest_api import views
from django.contrib.auth.models import User

urlpatterns = [
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^login/$', views.user_login.as_view()),
    url(r'^signup/$', views.user_signup.as_view()),
]