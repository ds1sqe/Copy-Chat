from rest_framework_simplejwt.views import (
        TokenObtainPairView,
        TokenRefreshView,
        )

from django.contrib import admin
from django.urls import path

from dj_rest_auth.views import (
    LoginView, LogoutView, PasswordChangeView, PasswordResetConfirmView,
    PasswordResetView, UserDetailsView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('account/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # URLs that do not require a session or valid token
    path('account/password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('account/password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('account/login/', LoginView.as_view(), name='rest_login'),
    # URLs that require a user to be logged in with a valid session / token.
    path('account/logout/', LogoutView.as_view(), name='rest_logout'),
    path('account/user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('account/password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
]
