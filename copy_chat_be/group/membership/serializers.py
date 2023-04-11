from account.serializers import AccountSerializer
from rest_framework import serializers

from .models import GroupMembership


class GroupMembershipSerializer(serializers.ModelSerializer):
    owners = AccountSerializer(many=True)

    class Meta:
        model = GroupMembership
        fields = ["id", "group_id", "name", "owners", "is_default", "permission"]
        depth = 1
