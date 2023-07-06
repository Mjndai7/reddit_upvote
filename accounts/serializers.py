from django.contrib.auth import get_user_model
from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from .models import userProfile
from django.conf import settings

User = get_user_model

# Custom user serializer
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('public_id', 'email', 'username', 'password')
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if not representation("avatar"):
            representation["avatar"] = settings.DEFAULT_AVATAR_URL
            return representation
        if settings.DEBUG:
            request = self.context.get("request")
            representation["avatar"] = request.build_absolute_uri(
                representation["avatar"]
            )
            return representation

class UserSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = userProfile
        fields = '__all__'



