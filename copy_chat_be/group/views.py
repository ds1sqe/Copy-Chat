from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from .models import Group, SubGroup
from .serializers import GroupSerializer

from .membership.models import GroupMembership, Permission


class GroupView(generics.ListAPIView,generics.CreateAPIView,generics.DestroyAPIView):
    
    http_method_names = ["get","post", "delete"]
    permission_classes = (IsAuthenticated,)
    serializer_class = GroupSerializer

    def get(self,request:Request,*args,**kwargs):
        """
        get groups which accounts' owner have enlisted
        """
        groups = request.user.joined_groups.all()
        if len(groups)==0:
            return JsonResponse(status=status.HTTP_204_NO_CONTENT,data={"group":None},safe=False)
        else:
            s = self.get_serializer(groups, many=True)
            return JsonResponse(data={"group":s.data},safe=False)


    def post(self, request: Request, *args, **kwargs):
        """
        Create new group
        """
        group_name= request.data.get("groupname")

        if not group_name:
            return JsonResponse(
                    status=status.HTTP_400_BAD_REQUEST,data={"success":False,"msg":"please provide group name"}
                    ,safe= False
                )

        group_exists= Group.objects.filter(name=group_name).exists()

        if group_exists:
            return JsonResponse(
                status=status.HTTP_409_CONFLICT,data={"success": False, "msg": "group_name duplicated"}, safe=False
            )

        else:
                s :GroupSerializer = self.get_serializer(data={"name":group_name},context=request)
                print(repr(s))
                print(repr(s.is_valid()))
                if s.is_valid():
                    group = s.save()
                    group.save()

                    group.members.add(request.user)

                    membership = GroupMembership.objects.create(
                    group=group,name="Head",
                    permission=Permission.all()
                    )

                    membership.owners.add(request.user)

                    SubGroup.objects.create(group=group,name="default")

                    GroupMembership.objects.create(
                    group=group,name="Member",
                    is_default=True,
                    permission=Permission.invite_only()
                    )

                    return JsonResponse(
                            status=status.HTTP_201_CREATED,data={"success":True,
                                  "msg":"group created","group":GroupSerializer(group).data}, safe=False
                    )
                return JsonResponse(
                    {"success": False, "msg": "invaild request"}, safe=False
                )


    def delete(self, request: Request, *args,**kwargs):
        group_id = request.data.get("group_id")
        try:
            group = Group.objects.get(id=group_id)
        except Group.DoesNotExist as e :
            return JsonResponse(data={"success":False,
                                      "msg":"Need Permission to Delete Group","detail":str(e)},safe=False)
        
        try:
            membership = GroupMembership.objects.filter(group=group,owners__in=[request.user]).get()
            p = Permission(membership.permission)
            if p.delete_group:
                group.delete()
                return JsonResponse(data={"success":True,
                                          "group_id":group_id,},safe=False)
        except GroupMembership.DoesNotExist as e :
            return JsonResponse(data={"success":False,
                                      "msg":"Need Permission to Delete Group","detail":str(e)},safe=False)

class SubGroupView(generics.CreateAPIView,generics.DestroyAPIView):
    
    http_method_names = ["post", "delete"]

    permission_classes = (IsAuthenticated,)
    serializer_class = GroupSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create new group
        """
        group_name= request.data.get("groupname")

        if not group_name:
            return JsonResponse(
                    status=status.HTTP_400_BAD_REQUEST,data={"success":False,"msg":"please provide group name"}
                    ,safe= False
                )

        group_exists= Group.objects.filter(name=group_name).exists()

        if group_exists:
            return JsonResponse(
                status=status.HTTP_409_CONFLICT,data={"success": False, "msg": "group_name duplicated"}, safe=False
            )

        else:
                s :GroupSerializer = self.get_serializer(data={"name":group_name},context=request)
                if s.is_valid():
                    group = s.save()
                    group.save()

                    group.members.add(request.user)

                    membership = GroupMembership.objects.create(
                    group=group,name="Head",
                    permission=Permission.all()
                    )

                    membership.owners.add(request.user)

                    GroupMembership.objects.create(
                    group=group,name="Member",
                    is_default=True,
                    permission=Permission.invite_only()
                    )

                    return JsonResponse(
                            status=status.HTTP_201_CREATED,data={"success":True,
                                  "msg":"group created","group":GroupSerializer(group).data}, safe=False
                    )
                return JsonResponse(
                    {"success": False, "msg": "invaild request"}, safe=False
                )


    def delete(self, request: Request, *args,**kwargs):
        subgroup_id = request.data.get("subgroup_id")
        try:
            group = SubGroup.objects.get(id=subgroup_id)
        except SubGroup.DoesNotExist as e :
            return JsonResponse(data={"success":False,
                                      "msg":"SubGroup Not exist","detail":str(e)},safe=False)
        
        try:
            membership = GroupMembership.objects.filter(group=group,owners__in=[request.user]).get()
            p = Permission(membership.permission)
            if p.delete_group:
                group.delete()
                return JsonResponse(data={"success":True,
                                          "subgroup_id":subgroup_id,},safe=False)
        except GroupMembership.DoesNotExist as e :
            return JsonResponse(data={"success":False,
                                      "msg":"Need Permission to Delete Group","detail":str(e)},safe=False)
