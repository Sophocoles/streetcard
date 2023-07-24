from django.contrib.auth.models import User, AbstractUser
from django.db import models



class User(AbstractUser):
  first_name = models.CharField(max_length=5000)
  last_name = models.CharField(max_length=5000)
  email = models.EmailField(max_length=5000, unique=True)
  date_joined = models.DateTimeField(auto_now_add=True)
  last_login = models.DateTimeField(null=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = []
  USER_TYPE_CHOICES = (
      (1, 'client'),
      (2, 'provider'),
      (3, 'admin'),
      (4, 'superadmin'),
      (5, 'social_worker'),
      (5, 'staff'),
  )
  user_type = models.PositiveSmallIntegerField(choices=USER_TYPE_CHOICES)
  
class Agency(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    website = models.CharField(max_length=100)
    contact_person = models.CharField(max_length=100)
    phone_numbers = models.CharField(max_length=100)
    email = models.EmailField()
    description = models.TextField()
    
    

class Provider(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    clients = models.ManyToManyField('Client')

    def __str__(self):
        return self.name
    
class Client(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    providers = models.ManyToManyField('Provider')
    agencies = models.ManyToManyField(Agency, related_name='agency_clients')

    def __str__(self):
        return self.name
    
    
    



def __str__(self):
    return self.name
    
class FhirEndpoint(models.Model):
    name = models.CharField(max_length=255)
    url = models.URLField()
    client_id = models.CharField(max_length=120)
    redirect_uri = models.CharField(max_length=200)
    scope = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

###############    
class Patient(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, related_name='patients')
    fhir_endpoints = models.ManyToManyField(FhirEndpoint)
    # You can add other fields like age, address, etc. as needed

    def __str__(self):
        name = self.fname + " " + self.lname
        return name
    
class StreetCard_FHIR(models.Model):
    #Properies of the StreetCard_FHIR model
    name = models.CharField(max_length=100)
    client_id = models.CharField(max_length=120)
    scope = models.CharField(max_length=120)
    url = models.URLField(max_length=200)
    redirect_uri = models.CharField(max_length=200)
    patientId = models.CharField(max_length=100)
    patientName = models.CharField(max_length=100)

    def _str_(self):
        return self.name