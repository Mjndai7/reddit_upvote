from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import UserProfileListView, UserProfileListDetailView

urlpatterns = [
    # gets all the user profiles and crates a new profile
    path("all-profiles/", UserProfileListView.as_view(), name="all-profiles"),

    # retrieves profile details of the currently logged in user
    path("profile/<int:pk>/", UserProfileListDetailView.as_view(), name="profile"),
]
