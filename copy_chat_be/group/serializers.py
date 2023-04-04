from rest_framework import serializers

from .models import Group, SubGroup, Channel


class GroupDefaultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "description", "members"]


class GroupCreateSerializer(GroupDefaultSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "description", "members"]

class GroupFetchSerializer(GroupDefaultSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "description", "members"]


class SubGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubGroup
        fields = ["group", "id", "name", "description"]

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = ["group","subgroup","id","name","is_unique","type"]
