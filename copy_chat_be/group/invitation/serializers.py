from account.serializers import AccountSerializer
from group.serializers import GroupDefaultSerializer
from rest_framework import serializers

from .models import Invitation


class InvitationCreateSerializer(serializers.ModelSerializer):
    group = GroupDefaultSerializer()

    inviter = AccountSerializer()

    target = AccountSerializer()

    class Meta:
        model = Invitation
        fields = ["id", "group", "inviter", "target"]
        depth = 1


class InvitationSerializer(serializers.ModelSerializer):
    group = GroupDefaultSerializer()
    inviter = AccountSerializer()
    target = AccountSerializer()

    class Meta:
        model = Invitation
        fields = ["id", "group", "inviter", "target", "code"]
        depth = 1


class InvitationFetchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invitation
        fields = ["id", "group_id", "inviter_id", "target_id", "code"]
