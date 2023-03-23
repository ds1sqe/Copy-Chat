from account.models import Account
from django.http import JsonResponse
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.request import Request

from .serializers import AccountSerializer


class AccountRegisterView(generics.CreateAPIView):
    
    http_method_names = ["post", "delete"]
    permission_classes = (AllowAny,)

    def get_serializer_class(self):
        return AccountSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create new account
        """
        username = request.data.get("username")
        user_exists = Account.objects.filter(username=username).exists()

        if user_exists:
            return JsonResponse(
                {"success": False, "msg": "username duplicated"}, safe=False
            )
        else:
            try:
                acc = Account.objects.create_user(
                    username=username,
                    email=request.data.get("email"),
                    password=request.data.get("password"),
                )
            except:

                return JsonResponse(
                    {"success": False, "msg": "invaild request"}, safe=False
                )

            return JsonResponse({"success": True, "msg": "user created"}, safe=False)


class AccountDeleteView(generics.DestroyAPIView):
    def delete(self, request: Request, *args, **kwargs):
        """
        Delete account
        """
        if not request.user:
            return JsonResponse({"sucess": False, "msg": "user not exists"}, safe=False)

        Account.objects.get(username=request.user.name).delete()

        return JsonResponse({"sucess": True, "msg": "user deleted"}, safe=False)
