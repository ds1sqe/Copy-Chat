from django.http import JsonResponse 
from rest_framework import generics, status 
from rest_framework.permissions import IsAuthenticated 
from rest_framework.request import Request 
from ..membership.models import GroupMembership, Permission 
from ..models import Group, SubGroup
from ..serializers import SubGroupSerializer


class SubGroupCreateView(generics.CreateAPIView):
    http_method_names = ["post"]

    permission_classes = (IsAuthenticated,)
    serializer_class = SubGroupSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create new subgroup
        """
        group_id = request.data.get("group_id")
        subgroup_name = request.data.get("subgroup_name")

        if not group_id:
            return JsonResponse(
                status=status.HTTP_400_BAD_REQUEST,
                data={"success": False, "msg": "please provide groupid"},
                safe=False,
            )
        if not subgroup_name:
            return JsonResponse(
                status=status.HTTP_400_BAD_REQUEST,
                data={"success": False, "msg": "please provide name of subgroup"},
                safe=False,
            )

        group =Group.objects.filter(id=group_id) 
        group_exists = group.exists()

        if group_exists:
            try:
                group = group.get()
                membership = GroupMembership.objects.filter(
                    group=group, owners__in=[request.user]
                ).get()
                p = Permission(membership.permission)
                if p.create_subgroup:

                    s = SubGroup.objects.create(group=group,name=subgroup_name)

                    return JsonResponse(
                        data={
                            "success": True,
                            "subgroup": SubGroupSerializer(s).data
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

class SubGroupDeleteView(generics.DestroyAPIView):
    http_method_names = ["delete"]
    permission_classes = (IsAuthenticated,)
    serializer_class = SubGroupSerializer


    def delete(self, request: Request, *args, **kwargs):
        group_id = request.data.get("group_id")
        subgroup_id = request.data.get("subgroup_id")
        try:
            group = Group.objects.get(id=group_id)
            subgroup = SubGroup.objects.get(id=subgroup_id)

        except Group.DoesNotExist as e:
            return JsonResponse(
                data={"success": False, "msg": "Group Not exist", "detail": str(e)},
                safe=False,
            )
        except SubGroup.DoesNotExist as e:
            return JsonResponse(
                data={"success": False, "msg": "SubGroup Not exist", "detail": str(e)},
                safe=False,
            )

        try:
            membership = GroupMembership.objects.filter(
                group=group, owners__in=[request.user]
            ).get()
            p = Permission(membership.permission)
            if p.delete_subgroup:
                subgroup.delete()
                return JsonResponse(
                    data={
                        "success": True,
                        "subgroup_id": subgroup_id,
                    },
                    safe=False,
                )
            else:
                return JsonResponse(
                    data={
                        "success": False,
                        "msg": "Need Permission to Delete SubGroup",
                    },)
                
        except GroupMembership.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Need Permission to Delete SubGroup",
                    "detail": str(e),
                },
                safe=False,
            )
