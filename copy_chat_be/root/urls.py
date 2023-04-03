from account.views import (AccountRegisterView, AccountDeleteView)
from dj_rest_auth.views import (LoginView, LogoutView, PasswordChangeView,
                                PasswordResetConfirmView, PasswordResetView,
                                UserDetailsView)
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,
                                            TokenRefreshView, TokenVerifyView)

from group.views.group_views import GroupCreateView, GroupDeleteView, GroupFetchView
from group.views.subgroup_views import SubGroupCreateView, SubGroupDeleteView
from group.views.channel_views import ChannelCreateView,ChannelDeleteView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('account/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('account/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # URLs that do not require a session or valid token
    path('account/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('account/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('account/login/', LoginView.as_view(), name='rest_login'),
    path('account/register/',AccountRegisterView.as_view(),name="account_register"),
    # URLs that require a user to be logged in with a valid session / token.
    path('account/logout/', LogoutView.as_view(), name='rest_logout'),
    path('account/detail/', UserDetailsView.as_view(), name='rest_user_details'),
    path('account/password/change/', PasswordChangeView.as_view(), name='rest_password_change'),

    # URL for fetch data
    path('fetch/group/',GroupFetchView.as_view(),name='group_fetch'),

    path('group/create/',GroupCreateView.as_view(),name='group_create'),
    path('group/delete/',GroupDeleteView.as_view(),name='group_delete'),

    path('subgroup/create/',SubGroupCreateView.as_view(),name='subgroup_create'),
    path('subgroup/delete/',SubGroupDeleteView.as_view(),name='subgroup_delete'),

    path('channel/create/',ChannelCreateView.as_view(),name='channel_create'),
    path('channel/delete/',ChannelDeleteView.as_view(),name='channel_delete'),
]
