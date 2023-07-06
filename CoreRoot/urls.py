
from django.contrib import admin
from django.urls import path, include,re_path
from django.views.generic import TemplateView
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('api/accounts/', include('accounts.urls')), #path to our account's endpoints
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)  # urls for my media to be able to access via urls

# handling react
urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
