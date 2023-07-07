from django.shortcuts import render
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from .models import userProfile
from .permissions import IsUserProfileOrReadOnly
from .serializers import UserCreateSerializer
# Create your views here.

class UserProfileListView(ListCreateAPIView):
    queryset = userProfile.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticated, IsAdminUser]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

class UserProfileListDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [IsUserProfileOrReadOnly, IsAuthenticated]
