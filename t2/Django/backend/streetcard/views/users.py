from django.shortcuts import render, redirect
from django.contrib.auth import login
from django.contrib.auth.forms import AuthenticationForm
from streetcard.forms.user.createUser import CustomUserCreationForm
from django.views.decorators.csrf import csrf_protect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from rest_framework import viewsets, generics
from django.db import models
from rest_framework.permissions import IsAuthenticated
from streetcard.models import CustomUser, Provider
from streetcard.serializers import CustomUserSerializer, CustomTokenObtainPairSerializer, ProviderSerializer  

from rest_framework.views import APIView

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.views import TokenObtainPairView


from django.contrib.auth import logout as django_logout

from rest_framework.decorators import api_view, permission_classes

@login_required
def client_dashboard(request):
    # Your view logic here
    pass#delete

@login_required
def provider_dashboard(request):
    # Your view logic here
    pass#delete

"""
def signup(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            if form.cleaned_data['user_type'] == 'client':
                return redirect('/clientDash')
            elif form.cleaned_data['user_type'] == 'provider':
                return redirect('http://localhost:3000/providerDash')
    else:
        form = CustomUserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

@csrf_protect
def login_view(request):
    # Redirect authenticated users to their respective dashboards
    if request.user.is_authenticated:
        if request.user.user_type == 'client':
            return redirect('http://localhost:3000/about')
        elif request.user.user_type == 'provider':
            return redirect('http://localhost:3000/providerDash')
        else:
            return redirect('http://localhost:3000/about')

    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            if user.user_type == 'client':
                return redirect('http://localhost:3000/about')
            elif user.user_type == 'provider':
                return redirect('http://localhost:3000/providerDash')
            else:
                return redirect('http://localhost:3000/about')
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})
"""

#Get logged-in user's information

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_info(request):
   
        user = request.user
        response_data = {
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
        }
        print("hello",user.first_name)
        return JsonResponse(response_data)

class CustomUserViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.order_by("first_name")
    serializer_class = CustomUserSerializer

    def get_queryset(self):
        qs = super().get_queryset()

        # Get only contact about current authenticated user
        qs = qs.filter(user=self.request.user)

        # Add search capabilities
        search = self.request.query_params.get("search", None)
        if search:
            qs = qs.filter(
                models.Q(first_name__icontains=search)
                | models.Q(last_name__icontains=search)
                | models.Q(email__icontains=search)
            )

        return qs
    

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = CustomUserSerializer(request.user)
        return Response(serializer.data)

@api_view(["POST"])
def signup(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        email = request.data.get("email")
        password = request.data.get("password")
        print("User's password: ",password)
        if user:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST", "GET"])
def login_view(request):
    print("Login view")
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(email=email, password=password)
    print("User:", user)
    if user:
        serializer = CustomUserSerializer(user)
        print("Token received:", serializer.data["access"])
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({"error": "Invalid Credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer  # Update this line
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        print("Serialized data:", response.data)
        return response

@api_view(["POST"])
def logout(request):
    django_logout(request)
    return Response({"detail": "Logged out successfully"}, status=status.HTTP_200_OK)

class ProviderListCreateView(generics.ListCreateAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

class ProviderList(generics.ListAPIView):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer