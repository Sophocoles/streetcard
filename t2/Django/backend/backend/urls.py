from django.contrib import admin
from django.urls import path, include
from django.views.generic.base import TemplateView


urlpatterns = [
    path('', include('streetcard.urls')),    
    path("admin/", admin.site.urls),
    path("accounts/", include("streetcard.urls")),
    #path("accounts/", include("django.contrib.auth.urls")),
]