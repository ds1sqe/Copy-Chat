from rest_framework import serializers

from .models import Group, SubGroup


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name", "description", "members"]


class SubGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubGroup
        fields = ["group", "id", "name", "description"]
