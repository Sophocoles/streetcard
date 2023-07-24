from rest_framework import serializers
from .models import CustomUser, Provider, Client, Agency, FhirEndpoint, Service
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.models import update_last_login
from django.contrib.auth.hashers import make_password

User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Add this line

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    
    username_field = User.EMAIL_FIELD

    def validate(self, attrs):
        data = super().validate(attrs)
        update_last_login(None, self.user)
        print("Access token:", data['access'])

        return data

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProviderSerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True)

    class Meta:
        model = Provider
        fields = '__all__'
        extra_kwargs = {
            'user': {'required': False},
        }
        
    def create(self, validated_data):
        services_data = validated_data.pop('services')
        provider = Provider.objects.create(**validated_data)
        for service_data in services_data:
            service, _ = Service.objects.get_or_create(**service_data)
            provider.services.add(service)
        return provider
        
class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'
        
class AgencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Agency
        fields = '__all__'

class EndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = FhirEndpoint
        fields = '__all__'

#ToDo delete
class ProviderClientsSerializer(ClientSerializer):
    user = serializers.SerializerMethodField()

    class Meta(ClientSerializer.Meta):
        depth = 1

    def get_user(self, obj):
        user_serializer = UserSerializer(obj.user)
        return user_serializer.data
    
#Serializers for FHIR app
class FhirEndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = FhirEndpoint
        fields = ('name', 'url', 'redirect_uri', 'scope', 'client_id')
        
class FhirAgencySerializer(serializers.ModelSerializer):
    endpoints = FhirEndpointSerializer(many=True)

    class Meta:
        model = Agency
        fields = ('name', 'endpoints')
        
class FhirProviderClientsSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    endpoints = serializers.SerializerMethodField()

    class Meta:
        model = Client
        fields = ('first_name', 'last_name', 'endpoints', 'cerner_sandbox_patientId')

    def get_endpoints(self, obj):
        endpoints = set()
        for agency in obj.agencies.all():
            for endpoint in agency.endpoints.all():
                endpoints.add(endpoint)
        return FhirEndpointSerializer(endpoints, many=True).data


#New serializers below

