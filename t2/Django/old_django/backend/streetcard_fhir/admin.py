from django.contrib import admin
from .models import StreetCard_FHIR, Provider, Patient, FhirEndpoint

class StreetCard_FHIRAdmin(admin.ModelAdmin):
    list_display = ('name', 'client_id', 'scope','url','redirect_uri','patientId','patientName')
    
class FhirEndpointInline(admin.TabularInline):
    model = Patient.fhir_endpoints.through
    extra = 1
    
class ProviderAdmin(admin.ModelAdmin):
    list_display = ('user', 'name')


class PatientAdmin(admin.ModelAdmin):
    list_display = ('lname', 'fname', 'provider')  # Add any other fields you want to display in the admin

# Register your models here.
admin.site.register(StreetCard_FHIR)
admin.site.register(Patient, PatientAdmin)
admin.site.register(Provider)
admin.site.register(FhirEndpoint)