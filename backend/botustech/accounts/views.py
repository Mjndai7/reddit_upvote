from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt, csrf_protect
from rest_framework.generics import (
    ListCreateAPIView, RetrieveUpdateDestroyAPIView
)
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response

from .models import userProfile
from .permissions import IsUserProfileOrReadOnly
from .serializers import UserCreateSerializer

@csrf_exempt
def csrf_failure(request, reason="Activation Failed"):
    return HttpResponse("Forbidden", status=403)

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

    def handle_no_permission(self):
        raise PermissionDenied()

    def initial(self, request, *args, **kwargs):
        try:
            return super().initial(request, *args, **kwargs)
        except PermissionDenied:
            return self.handle_no_permission()

    def post(self, request, *args, **kwargs):
        # Perform update logic
        # Assuming the code is successful, return a success response
        return Response("Update successful")

    def delete(self, request, *args, **kwargs):
        # Perform delete logic
        # Assuming the code is successful, return a success response
        return Response("Delete successful")
