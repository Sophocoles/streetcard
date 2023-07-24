from django.contrib import admin
from django.urls import path, include

from rest_framework import routers
from streetcard_fhir.views import views
from streetcard_fhir.views.views import ProviderPatientsView, PatientDetailView, ConfigFromDatabaseAPIView, PatientAndEndpointsAPIView
from streetcard_fhir.views import clients, providers, location


router = routers.DefaultRouter()
router.register(r'streetcard_fhirs', views.StreetCard_FHIRView, 'streetcard_fhir')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/config/', ConfigFromDatabaseAPIView.as_view(), name='config'),
    path('api/', include(router.urls)),
    path('rest-auth/', include('dj_rest_auth.urls')),  # Update this line
    path('fhir_endpoint/', views.FhirEndpointListCreateView.as_view(), name='fhir-endpoint-list-create'),
    
    ##create_account views
    #path('', include('location.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/signup/', location.SignUpView.as_view(), name='signup'),
    path('accounts/signup/client/', clients.ClientSignUpView.as_view(), name='client_signup'),
    path('accounts/signup/provider/', providers.ProviderSignUpView.as_view(), name='provider_signup'),
    
    
    #####
    path('api/patient/<int:pk>/add-endpoint/', views.AddEndpointToPatientView.as_view(), name='add-endpoint-to-patient'),
    path('api/patient/<int:pk>/remove-endpoint/', views.RemoveEndpointFromPatientView.as_view(), name='remove-endpoint-from-patient'),
    path('api/provider/patients/', views.ProviderPatientsView.as_view(), name='provider-patients'),  # Add this line
    path('api/patient/<int:pk>/', PatientDetailView.as_view(), name='patient-detail'),
    path('patient/', views.PatientListCreateView.as_view(), name='patient-list-create'),
    path("api/patient_and_endpoints/<int:patient_id>/", PatientAndEndpointsAPIView.as_view(), name="patient_and_endpoints"),
]
