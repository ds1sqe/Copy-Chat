from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from account.models import Account

class AccountAdmin(UserAdmin):
    list_display = ['id', 'username', 'email', 'first_name', 'last_name','phone_number']
    fieldsets = (
        ('Django Default', {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "email")}),
        (
            "Permissions",
            {
                "fields": (
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

admin.site.register(Account,AccountAdmin)


