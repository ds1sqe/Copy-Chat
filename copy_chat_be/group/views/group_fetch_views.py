from django.http import JsonResponse 
from rest_framework import generics, status 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.request import Request 
from ..membership.models import GroupMembership, Permission 
from ..models import Group
from ..serializers import GroupFetchSerializer

class GroupFetchView(generics.ListAPIView):
    http_method_names = ["get"]
    permission_classes = (IsAuthenticated,)
    serializer_class = GroupFetchSerializer

    def get(self, request: Request, *args, **kwargs):
        """
        get data related to group which accounts' owner have enlisted

        data list:
            [
            Group
                SubGroup
                Channels
                Members
                Membership
                    Owner
            ]
        """
        groups = request.user.joined_groups.all()
        if len(groups) == 0:
            return JsonResponse(
                status=status.HTTP_204_NO_CONTENT, data={"group": None}, safe=False
            )
        else:
            s = self.get_serializer(groups, many=True)
            return JsonResponse(data={"group": s.data}, safe=False)
