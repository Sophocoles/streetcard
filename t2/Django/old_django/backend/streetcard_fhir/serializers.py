from rest_framework import serializers
from .models import StreetCard_FHIR, Patient, Provider, FhirEndpoint

class StreetCard_FHIRSerializer(serializers.ModelSerializer):
    class Meta:
        model = StreetCard_FHIR
        fields = ('id', 'name', 'client_id', 'scope','url','redirect_uri','patientId','patientName')
        
class FhirEndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = FhirEndpoint
        fields = '__all__'

class PatientSerializer(serializers.ModelSerializer):
    fhir_endpoints = FhirEndpointSerializer(many=True, read_only=True)  # Change this line

    class Meta:
        model = Patient
        fields = '__all__'



class ProviderSerializer(serializers.ModelSerializer):
    patients = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = Provider
        fields = ['id', 'name', 'patients']

