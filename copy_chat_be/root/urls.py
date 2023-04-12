from account.views import AccountDeleteView, AccountRegisterView
from dj_rest_auth.views import (
    LoginView,
    LogoutView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
    UserDetailsView,
)
from django.contrib import admin
from django.urls import path
from group.invitation.views import (
    InvitationActivationView,
    InvitationCreateView,
    InvitationFetchView,
    InvitationValidationView,
)
from group.views.channel_views import ChannelCreateView, ChannelDeleteView
from group.views.group_fetch_views import GroupFetchView
from group.views.group_views import GroupCreateView, GroupDeleteView
from group.views.subgroup_views import SubGroupCreateView, SubGroupDeleteView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("account/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("account/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("account/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    # URLs that do not require a session or valid token
    path(
        "account/password/reset/",
        PasswordResetView.as_view(),
        name="rest_password_reset",
    ),
    path(
        "account/password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="rest_password_reset_confirm",
    ),
    path("account/login/", LoginView.as_view(), name="rest_login"),
    path("account/register/", AccountRegisterView.as_view(), name="account_register"),
    # URLs that require a user to be logged in with a valid session / token.
    path("account/logout/", LogoutView.as_view(), name="rest_logout"),
    path("account/detail/", UserDetailsView.as_view(), name="rest_user_details"),
    path(
        "account/password/change/",
        PasswordChangeView.as_view(),
        name="rest_password_change",
    ),
    # URL for fetch data
    path("fetch/group/", GroupFetchView.as_view(), name="group_fetch"),
    path("fetch/invitation/", InvitationFetchView.as_view(), name="invitation_fetch"),
    # URL for group create, update, delete
    path("group/create/", GroupCreateView.as_view(), name="group_create"),
    path("group/delete/", GroupDeleteView.as_view(), name="group_delete"),
    path("subgroup/create/", SubGroupCreateView.as_view(), name="subgroup_create"),
    path("subgroup/delete/", SubGroupDeleteView.as_view(), name="subgroup_delete"),
    path("channel/create/", ChannelCreateView.as_view(), name="channel_create"),
    path("channel/delete/", ChannelDeleteView.as_view(), name="channel_delete"),
    # URL for invitation create, update, delete
    path(
        "invitation/create/", InvitationCreateView.as_view(), name="invitation_create"
    ),
    path(
        "invitation/validation/",
        InvitationValidationView.as_view(),
        name="invitation_validatation",
    ),
    path(
        "invitation/activation/",
        InvitationActivationView.as_view(),
        name="invitation_activation",
    ),
]
