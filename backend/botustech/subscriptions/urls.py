from django.urls import path
from .views import CreateSubscription, WebHook
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('create-subscription/', CreateSubscription.as_view()),
    path('webhook/', WebHook.as_view(), name='stripe-webhook'),
]