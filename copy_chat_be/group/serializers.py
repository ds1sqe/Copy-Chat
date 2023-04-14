from account.serializers import AccountSerializer
from data.message.serializers import MessageSerializer
from rest_framework import serializers

from .membership.serializers import GroupMembershipSerializer
from .models import Channel, Group, SubGroup


class GroupDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "description", "members"]


class GroupCreateSerializer(GroupDefaultSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "description", "members"]


class SubGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubGroup
        fields = ["group_id", "id", "name", "description"]


class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["group_id", "subgroup_id", "id", "name", "is_unique", "type"]


class ChannelFetchSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True)

    class Meta:
        model = Channel
        fields = [
            "group_id",
            "subgroup_id",
            "id",
            "name",
            "is_unique",
            "type",
            "messages",
        ]


class GroupFetchSerializer(GroupDefaultSerializer):
    members = AccountSerializer(many=True)
    subgroups = SubGroupSerializer(many=True)
    channels = ChannelFetchSerializer(many=True)

    class Meta:
        model = Group
        fields = [
            "id",
            "name",
            "description",
            "members",
            "subgroups",
            "channels",
            "memberships",
        ]
        depth = 1
