from data.message.models import Message
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = [
            "id",
            "group_id",
            "channel_id",
            "account_id",
            "event",
            "text",
            "file",
            "datetime",
        ]
