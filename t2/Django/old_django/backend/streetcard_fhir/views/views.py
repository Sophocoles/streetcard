from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.mixins import UserPassesTestMixin
from django.contrib.auth.views import LoginView
from django.views import View
from django.shortcuts import get_object_or_404

from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from ..models import StreetCard_FHIR, Provider, Patient, FhirEndpoint
from ..serializers import (
    StreetCard_FHIRSerializer,
    ProviderSerializer,
    PatientSerializer,
    FhirEndpointSerializer,
)


class ConfigFromDatabaseAPIView(View):
    def get(self, request, *args, **kwargs):
        config = {}

        # Get FhirEndpoint instances
        fhir_endpoints = FhirEndpoint.objects.all()

        # Get Patient instances
        patients = Patient.objects.all()

        # Create a config object for each FhirEndpoint
        for endpoint in fhir_endpoints:
            patient_config = {}

            # Find the related patients for this FhirEndpoint
            related_patients = patients.filter(fhir_endpoints=endpoint)

            # Add patient configuration for each related patient
            for patient in related_patients:
                patient_full_name = f"{patient.fname} {patient.lname}"
                patient_config[patient_full_name] = {
                    "client_id": endpoint.client_id,
                    "scope": endpoint.scope,
                    "url": endpoint.url,
                    "redirectUri": endpoint.redirect_uri,
                    "patientName": patient_full_name,
                }

            # Add the patient configuration to the endpoint configuration
            config[endpoint.name] = patient_config

        return JsonResponse(config)

# Create your views here.
class CustomLoginView(LoginView):
    template_name = 'your_app/login.html'

class StreetCard_FHIRView(viewsets.ModelViewSet):
    serializer_class = StreetCard_FHIRSerializer
    queryset = StreetCard_FHIR.objects.all()
    
class ProviderPatientsView(generics.RetrieveAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            provider = request.user.provider
            provider_patients = provider.patients.all()
            serialized_patients = PatientSerializer(provider_patients, many=True).data
            provider_data = ProviderSerializer(provider).data
            provider_data['patients'] = serialized_patients
            return Response(provider_data, status=status.HTTP_200_OK)
        except Provider.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    
class PatientDetailView(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    
class PatientListCreateView(generics.ListCreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class FhirEndpointListCreateView(generics.ListCreateAPIView):
    queryset = FhirEndpoint.objects.all()
    serializer_class = FhirEndpointSerializer
    
class AddEndpointToPatientView(UserPassesTestMixin, generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def test_func(self):
        return self.request.user.is_authenticated and self.request.user.is_staff

    def handle_no_permission(self):
        return Response(status=status.HTTP_403_FORBIDDEN)

    def patch(self, request, *args, **kwargs):
        patient = self.get_object()
        endpoint_id = request.data.get('endpoint_id')
        endpoint = FhirEndpoint.objects.get(id=endpoint_id)
        patient.fhir_endpoints.add(endpoint)
        patient.save()
        return Response(status=status.HTTP_200_OK)

class RemoveEndpointFromPatientView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

    def patch(self, request, *args, **kwargs):
        patient = self.get_object()
        endpoint_id = request.data.get('endpoint_id')
        endpoint = FhirEndpoint.objects.get(id=endpoint_id)
        patient.fhir_endpoints.remove(endpoint)
        patient.save()
        return Response(status=status.HTTP_200_OK)
    
class PatientAndEndpointsAPIView(View):
    def get(self, request, *args, **kwargs):
        patient_id = kwargs['patient_id']
        patient = get_object_or_404(Patient, id=patient_id)
        endpoints = patient.fhir_endpoints.all()

        data = {
            'patient': {
                'id': patient.id,
                'fname': patient.fname,
                'lname': patient.lname,
            },
            'endpoints': [
                {
                    'id': endpoint.id,
                    'name': endpoint.name,
                    'url': endpoint.url,
                    'client_id': endpoint.client_id,
                    'redirect_uri': endpoint.redirect_uri,
                    'scope': endpoint.scope,
                }
                for endpoint in endpoints
            ],
        }
        return JsonResponse(data)
