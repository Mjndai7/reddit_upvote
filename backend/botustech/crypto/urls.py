from django.urls import path
from .views import CryptoPayment, WebHook

urlpatterns = [
    path('coinbase/', CryptoPayment.as_view()),
    path('webhook-crypto/', WebHook.as_view(), name='webhook-crypto'),

]