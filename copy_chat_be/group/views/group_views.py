from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from ..membership.models import GroupMembership, Permission
from ..membership.serializers import GroupMembershipSerializer
from ..models import Channel, Group, SubGroup
from ..serializers import (
    ChannelSerializer,
    GroupCreateSerializer,
    GroupDefaultSerializer,
    SubGroupSerializer,
)


class GroupCreateView(generics.CreateAPIView):
    http_method_names = ["post"]
    permission_classes = (IsAuthenticated,)
    serializer_class = GroupCreateSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create new group
        """
        group_name = request.data.get("groupname")

        if not group_name:
            return JsonResponse(
                status=status.HTTP_400_BAD_REQUEST,
                data={"success": False, "msg": "please provide group name"},
                safe=False,
            )

        group_exists = Group.objects.filter(name=group_name).exists()

        if group_exists:
            return JsonResponse(
                status=status.HTTP_409_CONFLICT,
                data={"success": False, "msg": "group_name duplicated"},
                safe=False,
            )

        else:
            s: GroupCreateSerializer = self.get_serializer(
                data={"name": group_name}, context=request
            )
            if s.is_valid():
                group = s.save()
                group.save()

                group.members.add(request.user)

                head = GroupMembership.objects.create(
                    group=group, name="Head", permission=Permission.all()
                )

                head.owners.add(request.user)

                member = GroupMembership.objects.create(
                    group=group,
                    name="Member",
                    is_default=True,
                    permission=Permission.invite_only(),
                )

                new_subgroup = SubGroup.objects.create(group=group, name="default")

                c = Channel.objects.create(
                    is_unique=True,
                    group=group,
                    subgroup=new_subgroup,
                    name="announcements",
                )

                return JsonResponse(
                    status=status.HTTP_201_CREATED,
                    data={
                        "success": True,
                        "msg": "group created",
                        "group": GroupCreateSerializer(group).data,
                        "membership": [
                            GroupMembershipSerializer(head).data,
                            GroupMembershipSerializer(member).data,
                        ],
                        "subgroup": SubGroupSerializer(new_subgroup).data,
                        "channel": ChannelSerializer(c).data,
                    },
                    safe=False,
                )
            return JsonResponse(
                {"success": False, "msg": "invaild request"}, safe=False
            )


class GroupDeleteView(generics.DestroyAPIView):
    http_method_names = ["delete"]
    permission_classes = (IsAuthenticated,)
    serializer_class = GroupDefaultSerializer

    def delete(self, request: Request, *args, **kwargs):
        group_id = request.data.get("group_id")
        try:
            group = Group.objects.get(id=group_id)
        except Group.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Need Permission to Delete Group",
                    "detail": str(e),
                },
                safe=False,
            )

        try:
            membership = GroupMembership.objects.filter(
                group=group, owners__in=[request.user]
            ).get()
            p = Permission(membership.permission)
            if p.delete_group:
                group.delete()
                return JsonResponse(
                    data={
                        "success": True,
                        "group_id": group_id,
                    },
                    safe=False,
                )
        except GroupMembership.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Need Permission to Delete Group",
                    "detail": str(e),
                },
                safe=False,
            )
