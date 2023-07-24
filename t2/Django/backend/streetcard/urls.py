from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views.users import logout, signup, login_view, get_user_info, CustomUserViewSet, MeView, CustomTokenObtainPairView, ProviderListCreateView , ProviderList
from .views.providers import provider_patients
from rest_framework.routers import DefaultRouter


urlpatterns = [
    #These urls take the form of yourDjangoUrl/accounts/pathName
    #path("signup/", signup, name="signup"),
    path("login/", CustomTokenObtainPairView.as_view(), name="login"),
    path("api/v1/users/", signup, name="signup"),
    path('api/v1/users/me/', MeView.as_view(), name='my_view'),
    path("api/v1/token/login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    
    #Provider directory views
    path('providers/', ProviderListCreateView.as_view(), name='provider-create'),
    path('providers/list/', ProviderList.as_view(), name='provider-list'),
    
    #Get user info
    path('api/user_info/', get_user_info, name='user_info'),
    
    #Auth views
    #path('api/v1/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/', MeView.as_view(), name='me'),
    path('api/v1/login/', login_view, name='api_login'),
    path("api/v1/token/logout/", logout, name="logout"),
    path('provider_patients/', provider_patients, name='provider_patients'),
]