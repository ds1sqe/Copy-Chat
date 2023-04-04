from rest_framework import serializers

from .models import GroupMembership

class GroupMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMembership
        fields = ["id", "group", "name", "owners","is_default","permission"]
