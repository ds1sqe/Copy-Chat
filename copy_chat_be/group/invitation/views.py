from account.models import Account
from django.db.models import Q
from django.http import JsonResponse
from group.invitation.models import Invitation
from group.models import Group
from group.serializers import GroupFetchSerializer
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.request import Request

from ..membership.models import GroupMembership, Permission
from .serializers import (
    InvitationCreateSerializer,
    InvitationFetchSerializer,
    InvitationSerializer,
)


class InvitationFetchView(generics.RetrieveAPIView):
    http_method_names = ["get"]
    permission_classes = (IsAuthenticated,)
    serializer_class = InvitationFetchSerializer

    def get(self, request: Request, *args, **kwargs):
        """
        Get invitations
        """

        i = Invitation.objects.filter(Q(target=request.user) | Q(inviter=request.user))
        invitations = self.get_serializer(i, many=True)

        return JsonResponse(
            status=status.HTTP_200_OK,
            data={
                "success": True,
                "invitation": invitations.data,
            },
            safe=False,
        )


class InvitationCreateView(generics.CreateAPIView):
    """
    Create Invitation
    """

    http_method_names = ["post"]
    permission_classes = (IsAuthenticated,)
    serializer_class = InvitationCreateSerializer

    def post(self, request: Request, *args, **kwargs):
        """
        Create a new invitation
        """
        group_id = request.data.get("group_id")

        if not group_id:
            return JsonResponse(
                status=status.HTTP_400_BAD_REQUEST,
                data={"success": False, "msg": "please provide group id"},
                safe=False,
            )

        group_exists = Group.objects.filter(id=group_id).exists()

        if not group_exists:
            return JsonResponse(
                status=status.HTTP_409_CONFLICT,
                data={"success": False, "msg": "group not exists"},
                safe=False,
            )

        else:
            target_id = request.data.get("target_id")
            target = None

            if target_id is None:
                if Invitation.objects.filter(group_id=group_id).exists():
                    return JsonResponse(
                        data={
                            "success": False,
                            "msg": "Your invitation already exists",
                        },
                        safe=False,
                    )

            elif target_id is not None:
                try:
                    target = Account.objects.get(id=target_id)
                except Account.DoesNotExist as e:
                    return JsonResponse(
                        data={
                            "success": False,
                            "msg": "Target not found",
                            "detail": str(e),
                        },
                        safe=False,
                    )

            membership = GroupMembership.objects.filter(
                group_id=group_id, owners__in=[request.user]
            ).get()

            p = Permission(membership.permission)

            if p.invite_member:
                invitation = Invitation.objects.create(
                    group_id=group_id,
                    inviter=request.user,
                    target=target,
                )

                return JsonResponse(
                    status=status.HTTP_201_CREATED,
                    data={
                        "success": True,
                        "msg": "invitation created",
                        "invitation": InvitationSerializer(invitation).data,
                    },
                    safe=False,
                )

            return JsonResponse(
                {"success": False, "msg": "invaild request"}, safe=False
            )


class InvitationValidationView(generics.GenericAPIView):
    """
    join group with invitation code
    """

    http_method_names = ["get", "post"]
    permission_classes = (IsAuthenticated,)
    serializer_class = InvitationSerializer

    def get(self, request: Request, *args, **kwargs):
        """
        Check invitation code, and if it's valid, return group info
        """

        try:
            invitation = Invitation.objects.get(
                code=request.data.get("invitation_code")
            )
        except invitation.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Invitaion not found",
                    "detail": str(e),
                },
                safe=False,
            )

        if invitation.target is not None:
            if invitation.target.id != request.user.id:
                return JsonResponse(
                    data={
                        "success": False,
                        "msg": "Invitaion not valid",
                    },
                    safe=False,
                )
        else:
            return JsonResponse(
                status=status.HTTP_200_OK,
                data={
                    "success": True,
                    "invitation_valid": True,
                    "group": GroupFetchSerializer(invitation.group).data,
                },
                safe=False,
            )

    def post(self, request: Request, *args, **kwargs):
        """
        Activate invitation, and if it's valid, join to group
        """
        try:
            invitation = Invitation.objects.get(
                code=request.data.get("invitation_code")
            )
        except invitation.DoesNotExist as e:
            return JsonResponse(
                data={
                    "success": False,
                    "msg": "Invitaion not found",
                    "detail": str(e),
                },
                safe=False,
            )

        if invitation.target is not None:
            if invitation.target.id != request.user.id:
                return JsonResponse(
                    data={
                        "success": False,
                        "msg": "Invitaion not valid",
                    },
                    safe=False,
                )
        else:
            invitation.group.members.add(request.user)
            membership = GroupMembership.objects.get(
                group=invitation.group, is_default=True
            )
            membership.owners.add(request.user)

            return JsonResponse(
                status=status.HTTP_200_OK,
                data={
                    "success": True,
                    "group": GroupFetchSerializer(invitation.group).data,
                },
                safe=False,
            )
