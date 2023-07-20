from django.urls import re_path, include
from django.conf import settings

from .views import start, BotMenuElemViewSet, UserViewSet, some_debug_func
from .views import account, start_order
from .views import AddBalanceViewSet
from .views import GetStartedViewSet
from .views import PaymentsViewSet
from .views import StripePaymentsViewSet
from .views import GetStripPackageViewSet

urlpatterns = [
    re_path('start', start, name='start'),
    re_path('main_menu', start, name='start'),
    re_path('account', account, name='account'),
    re_path('new_order', start_order, name='new_order'),

    re_path('sb/', BotMenuElemViewSet, name='BotMenuElemViewSet'),
    re_path('gs/', GetStartedViewSet, name='GetStartedViewSet'),
    re_path('pm/', PaymentsViewSet, name='PaymentsViewSet'),
    re_path('sp/', StripePaymentsViewSet, name='StripePaymentsViewSet'),
    re_path('gl/', GetStripPackageViewSet, name='GetStripPackageViewSet'),
    re_path('us/', UserViewSet, name='UserViewSet'),
    re_path('au/', AddBalanceViewSet, name='AddBalanceViewSet'),
]

if settings.DEBUG:
    urlpatterns += [
        re_path('some_debug_func', some_debug_func, name='some_debug_func'),
    ]