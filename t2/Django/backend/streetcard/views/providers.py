from django.shortcuts import get_object_or_404
from streetcard.models import Provider, Client, Agency
from streetcard.serializers import ProviderSerializer, ClientSerializer, AgencySerializer, ProviderClientsSerializer, FhirEndpointSerializer, FhirAgencySerializer, FhirProviderClientsSerializer
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework import status, generics
from django.views.decorators.http import require_http_methods
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def provider_patients(request):
    if request.user.user_type != 'provider':
        return JsonResponse({"error": "User is not a provider"}, status=status.HTTP_400_BAD_REQUEST)

    provider = get_object_or_404(Provider, user=request.user)
    clients = provider.clients.all()
    client_serializer = FhirProviderClientsSerializer(clients, many=True)

    response_data = {
        "patients": client_serializer.data,
    }
    return JsonResponse(response_data, safe=False)



