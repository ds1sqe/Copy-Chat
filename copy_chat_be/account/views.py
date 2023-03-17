from django.http import JsonResponse
from rest_framework import generics, permissions, status
from rest_framework.request import Request

from account.models import Account

from .serializers import AccountSerializer

class AccountView(
    generics.CreateAPIView, generics.DestroyAPIView
):
    http_method_names = ["post","delete"]

    def get_serializer_class(self):
        return AccountSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create new account
        """
        username = kwargs.get("username")
        if Account.objects.filter(username=username).exists(username):
            return JsonResponse({
                "sucess":False,
                "msg":"username duplicated"
                },safe=False)
        else:
            try:
                acc = Account.objects.create(
                    username = username,
                    first_name=kwargs.get("first_name"),
                    last_name=kwargs.get("last_name"),
                    email = kwargs.get("email"),
                    password = kwargs.get("password"),
                    )
            except:
                return JsonResponse({
                    "sucess":False,
                    "msg":"invaild request"
                    },safe=False)

        return JsonResponse({
                    "sucess":True,
                    "msg":"user created"
                    },safe=False)

    def delete(self, request: Request, *args, **kwargs):
        """
        Delete account
        """
        if not request.user:
                return JsonResponse({
                    "sucess":False,
                    "msg":"user not exists"
                    },safe=False)

        Account.objects.get(username=request.user.name).delete()

        return JsonResponse({
                    "sucess":True,
                    "msg":"user deleted"
                    },safe=False)
