from typing import Tuple

from account.models import Account
from rest_framework_simplejwt.tokens import AccessToken


class AuthHelper:
    @classmethod
    def find_user_by_access_token(cls, access_token: str) -> Tuple[Account, int]:
        """
        find user by access token.
        access_token: put access token
        return: `Account` object and user pk.
        """

        access_token_obj = AccessToken(access_token)
        print(repr((access_token_obj)))
        account_id = access_token_obj["user_id"]
        account = Account.objects.get(id=account_id)
        return account, account_id
