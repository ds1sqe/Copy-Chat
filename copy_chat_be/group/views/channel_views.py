from django.http import JsonResponse 
from rest_framework import generics, status 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.request import Request 
from ..membership.models import GroupMembership, Permission 
from ..models import Channel, Group, SubGroup
from ..serializers import ChannelSerializer


class ChannelCreateView(generics.CreateAPIView):
    http_method_names = ["post"]

    permission_classes = (IsAuthenticated,)
    serializer_class = ChannelSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create new channel
        """
        group_id = request.data.get("group_id")
        subgroup_id = request.data.get("subgroup_id")
        channel_name = request.data.get("channel_name")

        if not group_id:
            return JsonResponse(
                status=status.HTTP_400_BAD_REQUEST,
                data={"success": False, "msg": "please provide groupid"},
                safe=False,
            )

        group =Group.objects.filter(id=group_id) 
        
        group_exists = group.exists()

        
        if not group_exists:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Group Not Found",
                },
                safe=False,
                )

        channel_exists = Channel.objects.filter(group_id=group_id,subgroup_id=subgroup_id,name=channel_name).exists()

        if channel_exists:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Channel name duplicated",
                },
                safe=False,
                )


        try:
            group = group.get()
            membership = GroupMembership.objects.filter(
                group=group, owners__in=[request.user]
            ).get()
            p = Permission(membership.permission)

            if p.create_channel:
                c = Channel.objects.create(group=group,subgroup_id=subgroup_id,name=channel_name)

                return JsonResponse(
                    data={
                        "success": True,
                        "channel": ChannelSerializer(c).data
                    },
                    safe=False,
                )
            else:
                return JsonResponse(
                    data={
                        "success": False,
                        "msg": "Need Permission to Create SubGroup",
                    },
                    safe=False,
                )
        except GroupMembership.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Need Permission to Create SubGroup",
                    "detail": str(e),
                },
                safe=False,
            )



class ChannelDeleteView(generics.DestroyAPIView):
    http_method_names = ["delete"]
    permission_classes = (IsAuthenticated,)
    serializer_class = ChannelSerializer


    def delete(self, request: Request, *args, **kwargs):
        channel_id = request.data.get("channel_id")

        try:
            channel = Channel.objects.get(id=channel_id)

        except Channel.DoesNotExist as e:
            return JsonResponse(
                data={"success": False, "msg": "Channel not exists", "detail": str(e)},
                safe=False,
            )

        try:
            membership = GroupMembership.objects.filter(
                group=channel.group, owners__in=[request.user]
            ).get()
            p = Permission(membership.permission)
            if p.delete_channel:
                channel.delete()
                return JsonResponse(
                    data={
                        "success": True,
                        "channel_id": channel_id,
                    },
                    safe=False,
                )
            else:
                return JsonResponse(
                    data={
                        "success": False,
                        "msg": "Need Permission to Delete Channel",
                    },)
                
        except GroupMembership.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Need Permission to Delete Channel",
                    "detail": str(e),
                },
                safe=False,
            )
